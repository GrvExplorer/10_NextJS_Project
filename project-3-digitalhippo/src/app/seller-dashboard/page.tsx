import ProductCarousel from "@/components/product/product-carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SellerProductsDetails() {
  return (
    <Tabs defaultValue="all">
      <TabsList className="flex items-center w-fit gap-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
      </TabsContent>
    </Tabs>
  );
}
