export const registerFormControls = [
  {
    name: 'userName',
    label: 'UserName',
    placeholder: 'Enter your userName',
    componentType: 'input',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    componentType: 'input',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    componentType: 'input',
    type: 'password',
  }
];

export const LoginFormControls = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    componentType: 'input',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    componentType: 'input',
    type: 'password',
  }
];

export const adminSidebarMenuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard'
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products'
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders'
  },
  {
    id: 'features',
    label: 'Features',
    path: '/admin/features'
  }
];

export const addProductFormElements = [
  {
    label: "Product Name",
    name: "productName",
    componentType: "input",
    type: "text",
    placeholder: "Enter product name",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Product Type",
    name: "productType",
    componentType: "input",
    type: "text",
    placeholder: "Enter product type",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "headphone", label: "Headphone" },
      { id: "earbuds", label: "Earbuds" },
      { id: "neckband", label: "Neckband" }, // Changed from speaker to neckband
    ],
  },
  {
    label: "Color",
    name: "color",
    componentType: "select",
    options: [
      { id: "white", label: "White" },
      { id: "black", label: "Black" },
      { id: "gray", label: "Gray" },
      { id: "orange", label: "Orange" },
    ],
  },
  {
    label: "Trend",
    name: "trend",
    componentType: "input",
    type: "text",
    placeholder: "Enter product trend",
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (required)",
  },
  {
    label: "Discount",
    name: "discount",
    componentType: "input",
    type: "number",
    placeholder: "Enter discount",
  },
  {
    label: "Total Stock",
    name: "stockQuantity",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "headphone",
    label: "Headphone",
    path: "/shop/headphones",
  },
  {
    id: "neckband", // Changed from speaker to neckband
    label: "Neckband", // Changed label from Speaker to Neckband
    path: "/shop/neckbands", // Changed path from speaker to neckband
  },
  {
    id: "Earbuds",
    label: "Earbuds",
    path: "/shop/earbuds",
  },
  {
    id: "About",
    label: "About",
    path: "/shop/About",
  },
  {
    id: "Contact",
    label: "Contact",
    path: "/shop/Contact",
  },
  {
    id: "Product",
    label: "Product",
    path: "/shop/listing",
  },
];

export const categoryOptionsMap = {
  neckband: "Neckband", // Changed from speaker to neckband
  earbuds: "Earbuds",
  headphones: "Headphones",
};

export const brandOptionsMap = {
  white: "White",
  black: "Black",
  gray: "Gray",
  orange: "Orange",
};

export const filterOptions = {
  category: [
    { id: "headphone", label: "Headphone" },
    { id: "earbuds", label: "Earbuds" },
    { id: "neckband", label: "Neckband" }, // Changed from speaker to neckband
  ],
  color: [
    { id: "white", label: "White" },
    { id: "black", label: "Black" },
    { id: "gray", label: "Gray" },
    { id: "orange", label: "Orange" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  
];

export const addressFormControls = [
  {
    label: "Name",
    name: "name",
    componentType: "input",
    type: "text",
    placeholder: "Enter your name",
  },
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];

export const categories = [
  {
    name: 'Earbuds',
    slug: 'earbuds',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80'
  },
  {
    name: 'Headphones',
    slug: 'headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Neckband', // Changed from Speaker to Neckband
    slug: 'neckbands', // Changed from speaker to neckband
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
];

export const featuredProducts = [
  {
    id: 1,
    name: 'Airdopes 131',
    category: 'Earphones',
    price: 39.99,
    oldPrice: 59.99,
    discount: 33,
    rating: 4,
    reviews: 1245,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1078&q=80',
    releaseDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Rockerz 450',
    category: 'Headphones',
    price: 49.99,
    oldPrice: 69.99,
    discount: 28,
    rating: 5,
    reviews: 987,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80',
    releaseDate: '2023-02-10'
  },
  {
    id: 3,
    name: 'Stone 1500',
    category: 'Neckbands', // Changed from Speakers to Neckbands
    price: 79.99,
    oldPrice: 99.99,
    discount: 20,
    rating: 4,
    reviews: 756,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    releaseDate: '2023-03-05'
  },
  {
    id: 4,
    name: 'Wave Neo',
    category: 'Watches',
    price: 29.99,
    oldPrice: 39.99,
    discount: 25,
    rating: 3,
    reviews: 432,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    releaseDate: '2023-04-20'
  },
  {
    id: 5,
    name: 'Airdopes 441',
    category: 'Earphones',
    price: 59.99,
    oldPrice: null,
    discount: null,
    rating: 5,
    reviews: 321,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    releaseDate: '2023-05-15'
  },
  {
    id: 6,
    name: 'Rockerz 550',
    category: 'Headphones',
    price: 69.99,
    oldPrice: 89.99,
    discount: 22,
    rating: 4,
    reviews: 654,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
    releaseDate: '2023-06-01'
  },
  {
    id: 7,
    name: 'Stone 650',
    category: 'Neckbands', // Changed from Speakers to Neckbands
    price: 49.99,
    oldPrice: null,
    discount: null,
    rating: 4,
    reviews: 432,
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    releaseDate: '2023-06-15'
  },
  {
    id: 8,
    name: 'Storm Pro',
    category: 'Watches',
    price: 79.99,
    oldPrice: 99.99,
    discount: 20,
    rating: 5,
    reviews: 321,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
    releaseDate: '2023-07-01'
  }
];