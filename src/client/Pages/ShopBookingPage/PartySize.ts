import { MenuItem, Shop } from "../../../types";

export class PartySize {
  private shop: Shop;

  private menu: MenuItem[];

  constructor(shop: Shop, menu: MenuItem[]) {
    this.shop = shop;
    this.menu = menu;
  }

  // Getter for the shop
  get getShop(): Shop {
    return this.shop;
  }
  // Getter for the menu
  get getMenu(): MenuItem[] {
    return this.menu;
  }
}
