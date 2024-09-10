React Toast Notification System
This project provides a React-based toast notification system utilizing MUI Joy's components. It allows for displaying customizable toast notifications, making it easy to provide user feedback.

Features
Toast Types: Supports multiple types of notifications including success, neutral, danger, warning, and primary.
Toast Variants: Offers various visual styles such as soft, solid, outlined, and plain.
Customizable Duration: Toasts can be displayed for custom durations.
Context API: Utilizes the React Context API to manage toast notifications across the application.
Automatic Dismissal: Toasts automatically disappear after the specified duration.
Installation
Ensure you have Node.js installed and install the necessary dependencies for the project.

Usage
Setup
Wrap your application with the ToastProvider component at the root level to enable toast notifications throughout your app.

Triggering Toasts
To trigger a toast, use the useToastActions hook in your components. You can easily display different types of toasts by calling the appropriate functions provided by this hook.

Customization
You can customize the toasts by setting properties such as the message content, type of notification, duration, and visual variant.