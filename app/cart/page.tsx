import BreadcrumbContact from "../../component/BreadcrumbContact";
import { getCartBreadcrumb } from "../../sanity/queries/getCartBreadcrumb";
import CartClient from "@/component/CartClient";

export default async function CartPage() {
  const breadcrumb = await getCartBreadcrumb();

  return (
    <main>
      <BreadcrumbContact data={breadcrumb} pageTitle="Cart" />
      <section className="max-w-6xl mx-auto p-4">
        <CartClient />
      </section>
    </main>
  );
}
