const generalMessages = (entity: string) => ({
  notFound: `${entity} not found`,
  alreadyExists: `${entity} already exists`,
  deleted: `${entity} deleted successfully`,
  updated: `${entity} updated successfully`,
  created: `${entity} created successfully`,
  found: `${entity} found successfully`,
  logout: `${entity} logged out successfully`,
  alreadyDeleted: `${entity} already deleted`,
});

export const MESSAGE = {
  category: { ...generalMessages('Category') },
  brand: { ...generalMessages('Brand') },
  product: { ...generalMessages('Product') },
  user: { ...generalMessages('User') },
  admin: { ...generalMessages('Admin') },
  customer: { ...generalMessages('Customer') },
  seller: { ...generalMessages('Seller') },
  profile: { ...generalMessages('Profile') },
  coupon: { ...generalMessages('Coupon') },
};
