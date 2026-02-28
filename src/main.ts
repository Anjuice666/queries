import { open } from "sqlite";
import sqlite3 from "sqlite3";

import { createSchema } from "./schema";
import { getLongPendingOrders } from "./queries/order_queries";
import { slackIntegration } from "./slack_integration";
import { Database } from "sqlite";

interface PendingOrder {
  order_id: number;
  order_number: string;
  order_date: string;
  total_amount: number;
  customer_name: string;
  phone: string;
  email: string;
  days_pending: number;
  shipping_address?: string;
  shipping_city?: string;
  shipping_state?: string;
  shipping_zip?: string;
}

async function main() {
  const db = await open({
    filename: "ecommerce.db",
    driver: sqlite3.Database,
  });

  console.log('Starting daily order monitoring...');

  try {
    // Create schema if needed
    await createSchema(db, true);

    // Find orders pending for more than 3 days
    const longPendingOrders = await getLongPendingOrders(db, 3);

    console.log(`Found ${longPendingOrders.length} orders pending for more than 3 days`);

    if (longPendingOrders.length > 0) {
      // Format orders for Slack alert
      const alerts = longPendingOrders.map(order => ({
        customer_name: order.customer_name,
        phone: order.phone || 'N/A',
        order_id: order.order_id,
        order_date: order.order_date,
        total_amount: order.total_amount,
        days_pending: Math.floor(order.days_pending)
      }));

      // Send Slack alert
      const alertSent = await slackIntegration.sendOrderAlert(alerts);

      if (alertSent) {
        console.log('Order alerts sent successfully');
      } else {
        console.log('Failed to send order alerts');
      }
    } else {
      console.log('No orders requiring follow-up found');
    }

  } catch (error) {
    console.error('Error during order monitoring:', error);
  }
}

main();
