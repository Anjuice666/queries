# E-commerce Data Utilities

A comprehensive TypeScript-based query suite for managing and analyzing e-commerce operations with SQLite database automation and daily monitoring capabilities.

## 🚀 Overview

This project provides a complete e-commerce data management solution that automates daily order monitoring and provides powerful analytics capabilities. It's designed to help e-commerce businesses track orders, manage inventory, analyze customer behavior, and receive actionable alerts through Slack integration.

## ✨ Key Features

### 📊 Daily Order Monitoring System
- **Automated Monitoring**: Runs as a cron job daily at 10:00 AM
- **Pending Order Detection**: Identifies orders older than 3 days
- **Slack Alerts**: Sends formatted notifications to #order-alerts channel
- **Customer Information**: Includes all customer details for follow-up

### 🛒 Comprehensive Query Suite

#### Customer Management
- Customer profiles, search, and segmentation
- Address management and activity tracking
- Customer lifetime value analysis

#### Order Management
- Order details and customer order history
- High-value orders tracking
- Date range queries and long pending orders detection

#### Product Catalog
- Product details and category searches
- Low stock alerts and reorder management
- Product search by name and SKU

#### Inventory Management
- Warehouse inventory tracking
- Product availability across warehouses
- Stock transfer recommendations
- Inventory value and movement analysis

#### Analytics & Reporting
- Customer lifetime value calculation
- Sales by category analysis
- Repeat customer identification
- Product performance metrics
- Trending products detection
- Customer segment analysis

#### Promotion Management
- Active promotions tracking
- Promotion eligibility checking
- Expiring promotions alerts
- Performance analytics
- Unused promotion identification

#### Review Management
- Product reviews retrieval
- Customer review history
- Unverified reviews detection
- Helpful reviews analysis
- Recent reviews tracking

#### Shipping & Logistics
- Shipping address management
- Orders by destination state
- Unshipped orders tracking
- Shipping cost analysis
- Delivery delay detection

## 🛠 Technology Stack

- **Language**: TypeScript
- **Database**: SQLite with comprehensive e-commerce schema
- **AI Integration**: @anthropic-ai/claude-agent-sdk
- **Runtime**: tsx for TypeScript execution
- **Notifications**: Slack webhook integration
- **Code Quality**: Prettier formatting, TypeScript checking

## 🗄 Database Schema

The schema supports a complete e-commerce system with 12 main tables:

- **Customers**: Customer profiles and information
- **Addresses**: Customer shipping and billing addresses
- **Customer Segments**: Customer categorization
- **Customer Activity Log**: Customer interaction history
- **Products**: Product catalog and details
- **Categories**: Product categorization
- **Inventory**: Stock levels across warehouses
- **Warehouses**: Storage location management
- **Orders**: Order records and status
- **Order Items**: Individual order line items
- **Reviews**: Product reviews and ratings
- **Promotions**: Marketing campaigns and offers

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Slack webhook URL for notifications

### Installation
```bash
# Install dependencies
npm run setup

# Or manually install
npm install
```

### Configuration
1. Set up environment variables:
   ```env
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
   ```

2. The main entry point will automatically:
   - Create database schema
   - Check for pending orders older than 3 days
   - Format alerts for Slack
   - Send notifications via Slack integration

## 📁 Project Structure

```
src/
├── main.ts              # Entry point and main execution
├── schema.ts           # Database schema creation
├── slack_integration.ts # Slack notification system
├── sdk.ts              # Claude SDK integration
└── queries/           # Query modules directory
    ├── customer_queries.ts
    ├── product_queries.ts
    ├── order_queries.ts
    ├── analytics_queries.ts
    ├── inventory_queries.ts
    ├── promotion_queries.ts
    ├── review_queries.ts
    └── shipping_queries.ts
```

## 🔧 Daily Operations

The system runs automatically as a cron job with the following schedule:

- **Time**: 10:00 AM daily
- **Action**: Checks for orders pending for more than 3 days
- **Output**: Slack notification with customer details for follow-up
- **Format**: Rich message with order ID, customer name, contact info, and order date

### Example Slack Alert
```
⚠️ Order Alert: 3+ Day Pending Orders

📦 Order ID: ORD-2024-12345
👤 Customer: John Doe
📧 Email: john.doe@example.com
📞 Phone: +1-555-0123
🏠 Address: 123 Main St, City, State 12345
📅 Order Date: 2024-01-15
⏱ Days Pending: 5

Please contact the customer to resolve the pending order.
```

## 💻 Usage Examples

### Basic Order Query
```typescript
import { getCustomerOrders } from './src/queries/order_queries';

// Get all orders for a customer
const customerOrders = await getCustomerOrders(db, 'john.doe@example.com');
```

### Analytics Query
```typescript
import { getRepeatCustomers } from './src/queries/analytics_queries';

// Get customers with more than 3 orders
const repeatCustomers = await getRepeatCustomers(db, 3);
```

### Inventory Check
```typescript
import { getLowStockProducts } from './src/queries/inventory_queries';

// Get products with stock below threshold
const lowStock = await getLowStockProducts(db, 10);
```

## 🔌 Integration Features

### Slack Integration
- Custom `SlackIntegration` class for notifications
- Configurable webhook URL via environment variables
- Rich message formatting with order details
- Automatic alert generation for pending orders

### Claude SDK Integration
- AI-powered query capabilities
- Automatic query improvement
- Prevents duplicate queries through hooks
- Code quality enforcement

## 📊 Analytics Capabilities

The system provides comprehensive analytics including:

- **Customer Analysis**: Lifetime value, repeat customers, segment analysis
- **Product Analysis**: Performance metrics, trending products, category sales
- **Order Analysis**: High-value orders, pending order tracking
- **Inventory Analysis**: Stock levels, transfer recommendations
- **Promotion Analysis**: Campaign performance, redemption rates

## 🔒 Security Features

- Parameterized queries prevent SQL injection
- Environment variable protection for sensitive data
- Type-safe database operations with TypeScript
- Comprehensive error handling and logging

## 🤝 Contributing

1. Follow the existing code patterns and TypeScript interfaces
2. Add appropriate error handling for new query functions
3. Include JSDoc comments for function documentation
4. Ensure all queries use parameterized statements
5. Test new functionality thoroughly

## 📝 License

This project is part of an internal e-commerce management system.

## 🚀 Future Enhancements

- Real-time order status updates
- Advanced predictive analytics
- Multi-language support
- REST API wrapper for external integrations
- Automated email notifications
- Advanced dashboard with real-time metrics