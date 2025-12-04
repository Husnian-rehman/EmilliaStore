import BreadcrumbContact from "../../component/BreadcrumbContact";
import { getWishlistBreadcrumb } from "../../sanity/queries/getWishlistBreadcrumb";

export default async function WishlistPage() {
  const breadcrumb = await getWishlistBreadcrumb();
  return (
    <main>
      <BreadcrumbContact data={breadcrumb} pageTitle="Wishlist" />
      {/* Wishlist page content here */}
    </main>
  );
}
