import { hookstate, useHookstate } from '@hookstate/core';

export const cartState = hookstate([]);

export const addItem = (item) => {
  console.log(item);
  const targetId = item.id;
  const items = JSON.parse(JSON.stringify(cartState.get()));
  const existingItem = items.some((item) => item.id === targetId);
  if (existingItem) {
    // Item is already in the cart, increase quantity by one
    const newItems = items.map((item) =>
      item.id === targetId ? { ...item, quantity: item.quantity + 1 } : item
    );
    cartState.set(newItems);
  } else {
    // Item is not in the cart, add it with quantity equal to one
    cartState.merge([
      {
        id: item.id,
        quantity: 1,
        description: item.description,
        name: item.name,
        picture: item.picture,
        price: item.price,
      },
    ]);
  }
};

const getQuantityById = (items, targetId) => {
  const foundItem = items.find((item) => item.id === targetId);
  return foundItem ? foundItem.quantity : null;
};
export const removeItem = (json) => {
  const targetId = json.id;
  const items = JSON.parse(JSON.stringify(cartState.get()));
  const currentQuantity = getQuantityById(items, targetId);
  if (currentQuantity === 1) {
    const filter_data = items.filter((obj) => obj.id !== json.id);
    cartState.set([...filter_data]);
  } else {
    const newItems = items.map((item) =>
      item.id === targetId ? { ...item, quantity: item.quantity - 1 } : item
    );
    cartState.set(newItems);
  }
};
