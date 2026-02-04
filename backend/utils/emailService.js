import nodemailer from 'nodemailer'

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// Send demo request confirmation email
export const sendDemoRequestEmail = async (demoRequest) => {
  try {
    // Email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: demoRequest.email,
      subject: 'Demo Request Received - The Alpha Network',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0066CC;">Thank You for Your Interest!</h2>
          <p>Dear ${demoRequest.fullName},</p>
          <p>We have received your demo request for <strong>${demoRequest.product}</strong>.</p>
          <p>Our team will review your request and get back to you within 24 hours to schedule a personalized demonstration.</p>
          <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3 style="margin-top: 0; color: #333;">Your Request Details:</h3>
            <p><strong>Name:</strong> ${demoRequest.fullName}</p>
            <p><strong>Email:</strong> ${demoRequest.email}</p>
            <p><strong>Phone:</strong> ${demoRequest.phone}</p>
            <p><strong>Product:</strong> ${demoRequest.product}</p>
          </div>
          <p>In the meantime, feel free to explore our <a href="${process.env.FRONTEND_URL}/products" style="color: #0066CC;">product catalog</a> or <a href="${process.env.FRONTEND_URL}/contact" style="color: #0066CC;">contact us</a> if you have any questions.</p>
          <p>Best regards,<br><strong>The Alpha Network Team</strong></p>
        </div>
      `
    })

    // Email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: `New Demo Request - ${demoRequest.product}`,
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${demoRequest.fullName}</p>
        <p><strong>Email:</strong> ${demoRequest.email}</p>
        <p><strong>Phone:</strong> ${demoRequest.phone}</p>
        <p><strong>Product:</strong> ${demoRequest.product}</p>
        ${demoRequest.companyName ? `<p><strong>Company:</strong> ${demoRequest.companyName}</p>` : ''}
        ${demoRequest.message ? `<p><strong>Message:</strong> ${demoRequest.message}</p>` : ''}
        <p><strong>Submitted:</strong> ${new Date(demoRequest.createdAt).toLocaleString()}</p>
      `
    })

    console.log('✅ Demo request emails sent')
  } catch (error) {
    console.error('❌ Email send error:', error)
    throw error
  }
}

// Send query confirmation email
export const sendQueryConfirmationEmail = async (query) => {
  try {
    // Email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: query.email,
      subject: 'Query Received - The Alpha Network',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0066CC;">Thank You for Contacting Us!</h2>
          <p>Dear ${query.fullName},</p>
          <p>We have received your query and our team will respond to you within 24 hours.</p>
          <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3 style="margin-top: 0; color: #333;">Your Query:</h3>
            <p>${query.query}</p>
          </div>
          <p>If you need immediate assistance, please call us at <strong>+91 70740-41201</strong>.</p>
          <p>Best regards,<br><strong>The Alpha Network Team</strong></p>
        </div>
      `
    })

    // Email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: `New Contact Query from ${query.fullName}`,
      html: `
        <h2>New Contact Query</h2>
        <p><strong>Name:</strong> ${query.fullName}</p>
        <p><strong>Email:</strong> ${query.email}</p>
        <p><strong>Phone:</strong> ${query.phone}</p>
        <p><strong>Query:</strong></p>
        <p>${query.query}</p>
        <p><strong>Submitted:</strong> ${new Date(query.createdAt).toLocaleString()}</p>
      `
    })

    console.log('✅ Query confirmation emails sent')
  } catch (error) {
    console.error('❌ Email send error:', error)
    throw error
  }
}

export default transporter
