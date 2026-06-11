'use client';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactUs() {


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

    const sectionRef = useRef(null);

  const [visible, setVisible] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formState); // Debug log
    try {
      setLoading(true);

      await emailjs.send(
        'service_8hf4nl5',
        'template_j76wkxx',
        {
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        },
        't2DcWm914zIwkQstI'
      );

      alert('Message sent successfully!');

      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  
  return (
    <section className={`contact-section ${visible ? 'visible' : ''}`} ref={sectionRef} id="contact-us">
      <div className="container">
        <div className="section-header">
          <span className="section-label">GET IN TOUCH</span>
          <h2 className="title">We'd Love to <strong>Hear From You</strong></h2>
          <p className="subtitle">Have questions about our frames, shipping, or need style advice? Reach out to our team.</p>
        </div>

        <div className="contact-grid">
          {/* Left: Contact Info */}
          <div className="contact-info">
            <div className="info-card">
              <div className="icon-wrap"><Phone size={20} /></div>
              <div className="info-text">
                <h3>Call Customer Care</h3>
                <p className="val">+91 8516820039</p>
                <p className="sub">Mon-Sun: 9:00 AM - 9:00 PM</p>
              </div>
            </div>

            <div className="info-card">
              <div className="icon-wrap"><Mail size={20} /></div>
              <div className="info-text">
                <h3>Email Us</h3>
                <p className="val">theeyeconic00@gmail.com</p>
                <p className="sub">We respond within 24 business hours</p>
              </div>
            </div>

            <div className="info-card">
              <div className="icon-wrap"><MapPin size={20} /></div>
              <div className="info-text">
                <h3>Visit Flagship Store</h3>
                <div>
                  <div>
                    <p className="val">Shop no 4, NFC</p>
                <p className="sub">Bhawarkua ustad marg, Indore 452001</p>
                  </div>
                  <div>
                    <p className="val">Shop no 3, Aayushi Apartment,</p>
                <p className="sub">Geeta Bhawan, Indore 452001</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="info-card">
              <div className="icon-wrap"><Clock size={20} /></div>
              <div className="info-text">
                <h3>Store Hours</h3>
                <p className="val">Daily: 10:30 AM - 10:00 PM</p>
                <p className="sub">Eye test appointments available daily</p>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
         <section
      className={`contact-section ${visible ? 'visible' : ''}`}
      ref={sectionRef}
      id="contact-us"
    >
      <div className="container">
        {/* Your existing JSX remains unchanged */}

        <div className="contact-form-wrap">
          <div className="form-header">
            <MessageSquare size={20} className="header-icon" />
            <h3>Send a Direct Message</h3>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={formState.name}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    name: e.target.value,
                  })
                }
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={formState.email}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    email: e.target.value,
                  })
                }
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                value={formState.subject}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    subject: e.target.value,
                  })
                }
                placeholder="Frame fit query, warranty, etc."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                rows={4}
                value={formState.message}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    message: e.target.value,
                  })
                }
                placeholder="Type your message here..."
                required
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              <span>
                {loading ? 'Sending...' : 'Send Message'}
              </span>
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Keep your existing styles here */}
    </section>
        </div>
      </div>

      <style jsx>{`
        .contact-section {
          padding: var(--section-padding, 80px 0);
          position: relative;
        }

        /* ===== HEADER ===== */
        .section-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 56px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }

        .contact-section.visible .section-header {
          opacity: 1;
          transform: translateY(0);
        }

        .title {
          font-size: clamp(28px, 3.5vw, 42px);
          font-weight: 300;
          letter-spacing: -0.5px;
          line-height: 1.2;
          margin: 8px 0 16px;
        }

        .title strong {
          font-weight: 600;
        }

        .subtitle {
          font-size: 15px;
          color: var(--text-secondary, #555);
          font-weight: 300;
        }

        /* ===== GRID ===== */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 50px;
          align-items: start;
        }

        /* ===== INFO CARDS ===== */
        .contact-info {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .info-card {
          padding: 24px;
          border-radius: var(--radius-lg, 16px);
          background: var(--bg-secondary, #faf9f7);
          border: 1px solid var(--border, #e8e6e3);
          transition: all var(--transition-medium);
          opacity: 0;
          transform: translateY(20px);
        }

        .contact-section.visible .info-card {
          opacity: 1;
          transform: translateY(0);
        }

        .contact-section.visible .info-card:nth-child(1) { transition-delay: 0.1s; }
        .contact-section.visible .info-card:nth-child(2) { transition-delay: 0.2s; }
        .contact-section.visible .info-card:nth-child(3) { transition-delay: 0.3s; }
        .contact-section.visible .info-card:nth-child(4) { transition-delay: 0.4s; }

        .info-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-accent);
        }

        .icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--bg);
          color: var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: var(--shadow-sm);
        }

        .info-text h3 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .val {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .sub {
          font-size: 12px;
          color: var(--text-secondary);
        }

        /* ===== FORM ===== */
        .contact-form-wrap {
          padding: 40px;
          border-radius: var(--radius-lg, 16px);
          background: var(--card-bg, #fff);
          border: 1px solid var(--border, #e8e6e3);
          box-shadow: var(--shadow-md);
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease 0.3s;
        }

        .contact-section.visible .contact-form-wrap {
          opacity: 1;
          transform: translateY(0);
        }

        .form-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }

        .header-icon {
          color: var(--color-accent);
        }

        .form-header h3 {
          font-size: 16px;
          font-weight: 600;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-secondary);
        }

        .form-group input,
        .form-group textarea {
          padding: 12px 16px;
          border-radius: var(--radius-md, 8px);
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-family: inherit;
          font-size: 14px;
          outline: none;
          transition: all var(--transition-fast);
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(26,26,46,0.1);
        }

        .submit-btn {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: var(--color-primary);
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border-radius: var(--radius-full);
          transition: all var(--transition-medium);
          cursor: pointer;
        }

        .submit-btn:hover {
          background: var(--color-accent);
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .contact-info {
            grid-template-columns: 1fr;
          }

          .contact-form-wrap {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}