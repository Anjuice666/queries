interface SlackAlert {
  customer_name: string;
  phone: string;
  order_id: number;
  order_date: string;
  total_amount: number;
  days_pending: number;
}

class SlackIntegration {
  private webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl || '';
  }

  async sendOrderAlert(alerts: SlackAlert[]): Promise<boolean> {
    if (!alerts || alerts.length === 0) {
      console.log('No alerts to send');
      return true;
    }

    if (!this.webhookUrl) {
      console.log('No webhook URL configured. Skipping Slack alert.');
      return false;
    }

    const message = {
      text: '🚨 Pending Orders Requiring Follow-up',
      channel: '#order-alerts',
      username: 'OrderMonitor',
      attachments: alerts.map(alert => ({
        color: 'warning',
        title: `Order #${alert.order_id} - ${alert.days_pending} days pending`,
        fields: [
          {
            title: 'Customer',
            value: `${alert.customer_name}`,
            short: true
          },
          {
            title: 'Phone',
            value: alert.phone || 'N/A',
            short: true
          },
          {
            title: 'Order Date',
            value: alert.order_date,
            short: true
          },
          {
            title: 'Total Amount',
            value: `$${alert.total_amount.toFixed(2)}`,
            short: true
          },
          {
            title: 'Days Pending',
            value: `${alert.days_pending} days`,
            short: true
          }
        ],
        footer: 'E-commerce Order Monitor',
        ts: Math.floor(Date.now() / 1000)
      }))
    };

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message)
      });

      if (response.ok) {
        console.log(`Successfully sent ${alerts.length} alert(s) to Slack`);
        return true;
      } else {
        console.error(`Failed to send Slack alert: ${response.status} - ${response.statusText}`);
        return false;
      }
    } catch (error) {
      console.error('Error sending Slack alert:', error);
      return false;
    }
  }
}

// Configuration - In production, this should be loaded from environment variables
export const SLACK_CONFIG = {
  WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL || process.env.SLACK_ORDER_WEBHOOK_URL,
  CHANNEL: '#order-alerts',
  USERNAME: 'OrderMonitor'
};

// Default instance (can be overridden with webhook URL from config)
export const slackIntegration = new SlackIntegration(SLACK_CONFIG.WEBHOOK_URL || '');

// Export the class for custom instances
export { SlackIntegration };