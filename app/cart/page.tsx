import BreadcrumbContact from "../../component/BreadcrumbContact";
import { getCartBreadcrumb } from "../../sanity/queries/getCartBreadcrumb";

export default async function CartPage() {
  const breadcrumb = await getCartBreadcrumb();
  return (
    <main>
      <BreadcrumbContact data={breadcrumb} pageTitle="Cart" />
      {/* Cart page content here */}
    </main>
  );
}
