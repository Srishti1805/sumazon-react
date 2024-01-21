import { hookstate, useHookstate } from '@hookstate/core';

export const cartState = hookstate([]);

export const addItem = (item) => {
  cartState.merge([item]);
};

export const removeItem = (json) => {
  const x = JSON.parse(JSON.stringify(cartState.get()));
  const filter_data = x.filter((obj) => obj.id !== json.id);
  cartState.set([...filter_data]);
};
