import { Kit } from "@/db/models/index/kit.model";
import { Seller } from "@/db/models/index/seller.model";
import { addKitSchema, updateKitSchema, updateSellerSchema } from "@/schemas";
import {
  authedProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const sellerRouter = createTRPCRouter({
  all: publicProcedure.query(async (req) => {
    const sellers = await Seller.find({});

    if (
      sellers === undefined ||
      sellers.length === 0 ||
      sellers.length === undefined
    )
      return { sellers: [], count: 0, offset: 0, limit: 5 };

    return { sellers, count: sellers.length, offset: 0, limit: 5 };
  }),

  changeStatus: authedProcedure
    .input(z.object({ _id: z.string(), status: z.string() }))
    .mutation(async (req) => {
      const { _id, status } = req.input;

      const { ctx } = req;

      if (ctx.user.user.email !== process.env.ADMIN_EMAIL)
        throw new TRPCError({ code: "UNAUTHORIZED" });

      const seller = await Seller.findByIdAndUpdate(
        _id,
        { status },
        { new: true },
      );

      if (!seller) throw new TRPCError({ code: "NOT_FOUND" });

      return { success: true };
    }),

  updateDetails: authedProcedure
    .input(updateSellerSchema)
    .mutation(async (req) => {
      const {
        userId,
        name,
        address,
        phoneNo,
        email,
        description,
        logoUrl,
        bannerUrl,
      } = req.input;

      const { ctx } = req;

      if (ctx.user.user.id !== userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const seller = await Seller.findOneAndUpdate(
        { user: userId },
        {
          name,
          address,
          phoneNo,
          email,
          description,
          logoUrl,
          bannerUrl,
        },
        { new: true },
      );

      if (!seller) throw new TRPCError({ code: "NOT_FOUND" });

      return { success: true, status: 202, message: "update successful" };
    }),

  addKit: authedProcedure.input(addKitSchema).mutation(async (req) => {
    const {
      productName,
      features,
      description,
      price,
      images,
      category,
      tags,
      sellerId,
      isPublished,
    } = req.input;

    const { ctx } = req;

    if (ctx.user.user.id !== sellerId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const sellerExists = await Seller.findOne({ _id: sellerId });

    if (!sellerExists) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    if (sellerExists.status === "canceled") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    if (sellerExists.status === "archived") {
      return {
        success: false,
        status: 400,
        error: "Seller is archived",
      };
    }

    // FIXME: add category

    const createKit = await Kit.create({
      productName,
      features,
      description,
      price,
      images,
      tags,
      seller: sellerId,
      isPublished,
    });

    if (!createKit)
      return {
        success: false,
        status: 500,
        error: "Failed to create kit. try again ?",
      };

    await Seller.findOneAndUpdate(
      { _id: sellerId },
      {
        $push: {
          kits: createKit._id,
        },
      },
      { new: true },
    );

    return {
      success: true,
      status: 201,
      message: "Kit created successfully",
    };
  }),

  updateKit: authedProcedure.input(updateKitSchema).mutation(async (req) => {
    const {
      productName,
      features,
      description,
      price,
      images,
      category,
      tags,
      sellerId,
      isPublished,
      id,
    } = req.input;

    const { ctx } = req;

    if (ctx.user.user.id !== sellerId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const sellerExists = await Seller.findOne({ _id: sellerId });

    if (!sellerExists) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    if (sellerExists.status === "canceled") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    if (sellerExists.status === "archived") {
      return {
        success: false,
        status: 400,
        error: "Seller is archived",
      };
    }
    if (!sellerExists.kits.includes(id)) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    // FIXME: add category
    const updateKit = await Kit.findByIdAndUpdate(
      id,
      {
        productName,
        features,
        description,
        price,
        images,
        tags,
        isPublished,
      },
      {
        new: true,
      },
    );

    if (!updateKit)
      return {
        success: false,
        status: 500,
        error: "Not able to update Kit details try again",
      };

    return {
      success: true,
      status: 202,
      message: "Updated the kit details Successfully",
    };
  }),
});
