const API_DELAY = 500; 


let products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 4000,
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation and 20-hour battery life. Experience crystal clear sound and all-day comfort.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Minimalist Backpack',
    price: 5500,
    category: 'Accessories',
    description: 'Durable water-resistant backpack perfect for daily commute or travel. Features laptop compartment and multiple pockets.',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Smart Watch Pro',
    price: 6500,
    category: 'Electronics',
    description: 'Track your fitness, receive notifications, and monitor your health with this advanced smart watch.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    inStock: false,
    createdAt: new Date().toISOString()
  }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  
  async getProducts() {
    await delay(API_DELAY);
    return [...products];
  },

  async getProduct(id) {
    await delay(API_DELAY);
    const product = products.find(p => p.id === parseInt(id));
    if (!product) throw new Error('Product not found');
    return { ...product };
  },

  async createProduct(productData) {
    await delay(API_DELAY);
    const newProduct = {
      ...productData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      inStock: productData.inStock ?? true
    };
    products.push(newProduct);
    return { ...newProduct };
  },

  async updateProduct(id, updates) {
    await delay(API_DELAY);
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) throw new Error('Product not found');
    
    products[index] = { ...products[index], ...updates, updatedAt: new Date().toISOString() };
    return { ...products[index] };
  },

  async patchProduct(id, updates) {
    await delay(API_DELAY);
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) throw new Error('Product not found');
    
    products[index] = { ...products[index], ...updates, updatedAt: new Date().toISOString() };
    return { ...products[index] };
  },

  async deleteProduct(id) {
    await delay(API_DELAY);
    const initialLength = products.length;
    products = products.filter(p => p.id !== parseInt(id));
    if (products.length === initialLength) throw new Error('Product not found');
    return { success: true, message: 'Product deleted successfully' };
  },

  async searchProducts(query) {
    await delay(API_DELAY);
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  }
};