export interface CartItem {
  variantId: string;
  title: string;
  price?: string | number;
  image?: string;
  quantity: number;
  handle?: string;
}

const KEY = "emilia_cart";

export function getCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch (e) {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addItem(item: CartItem) {
  const items = getCart();
  const idx = items.findIndex((i) => i.variantId === item.variantId);
  if (idx >= 0) {
    items[idx].quantity = (items[idx].quantity || 0) + item.quantity;
  } else {
    items.push(item);
  }
  saveCart(items);
}

export function removeItem(variantId: string) {
  const items = getCart().filter((i) => i.variantId !== variantId);
  saveCart(items);
}

export function clearCart() {
  saveCart([]);
}

export function getTotal() {
  const items = getCart();
  return items.reduce((sum, it) => sum + (Number(it.price) || 0) * (it.quantity || 0), 0);
}

export function getCheckoutUrl(items?: CartItem[]) {
  const cartItems = items || getCart();
  if (!cartItems || cartItems.length === 0) return undefined;

  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  if (!domain) return undefined;

  const normalizeVariant = (id: string) => {
    if (!id) return id;
    const m = String(id).match(/(\d+)$/);
    return m ? m[1] : id;
  };

  const parts = cartItems
    .map((it) => `${normalizeVariant(it.variantId)}:${it.quantity}`)
    .join(",");
  return `https://${domain}/cart/${parts}`;
}
