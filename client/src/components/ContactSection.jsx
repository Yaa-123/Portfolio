import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const floatingShapesRef = useRef(null);
  const contactSectionRef = useRef(null);

  useEffect(() => {
    createFloatingShapes();
  }, []);

  const createFloatingShapes = () => {
    if (!floatingShapesRef.current) return;
    
    const colors = ['bg-pink-400/20', 'bg-purple-400/20', 'bg-blue-400/20'];
    
    for (let i = 0; i < 12; i++) {
      const shape = document.createElement('div');
      shape.className = `floating-shape ${colors[i % 3]}`;
      
      const size = Math.random() * 200 + 50;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      
      // Animate the shape
      const keyframes = [
        { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
        { 
          transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(${Math.random() + 0.5}) rotate(360deg)` 
        },
        { transform: 'translate(0, 0) scale(1) rotate(0deg)' }
      ];
      
      const options = {
        duration: Math.random() * 20000 + 10000,
        iterations: Infinity,
        easing: 'linear',
        delay: Math.random() * 5000
      };
      
      shape.animate(keyframes, options);
      floatingShapesRef.current.appendChild(shape);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success toast
    setShowToast(true);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
    
    // Reset form
    e.target.reset();
    setIsSubmitting(false);
  };

  // Inline styles
  const styles = {
    contactContainer: {
      minHeight: '100vh',
      padding: '5rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      background: '#0f172a',
      color: 'white'
    },
    contentWrapper: {
      maxWidth: '80rem',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100vh'
    },
    gradientBg: {
      position: 'absolute',
      inset: 0,
      opacity: 0.3,
      background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c)',
      backgroundSize: '400% 400%',
      animation: 'gradientAnimation 15s ease infinite'
    },
    waveAnimation: {
      position: 'absolute',
      inset: 0,
      opacity: 0.1,
      background: 'radial-gradient(circle at 20% 20%, #667eea 0%, transparent 50%), radial-gradient(circle at 80% 80%, #f093fb 0%, transparent 50%), radial-gradient(circle at 40% 40%, #764ba2 0%, transparent 50%)',
      animation: 'waveScale 25s linear infinite, waveRotate 25s linear infinite'
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '4rem'
    },
    sectionTitle: {
      fontSize: '2.25rem',
      marginBottom: '1.5rem'
    },
    sectionSubtitle: {
      fontSize: '1.125rem',
      color: 'rgba(156, 163, 175, 1)',
      maxWidth: '42rem',
      margin: '0 auto'
    },
    contactGrid: {
      display: 'grid',
      gap: '4rem'
    },
    contactForm: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: '2rem',
      borderRadius: '1rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    formGrid: {
      display: 'grid',
      gap: '1rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      borderRadius: '0.375rem',
      border: '1px solid rgba(229, 231, 235, 0.2)',
      backgroundColor: 'rgba(31, 41, 55, 0.5)',
      color: 'white',
      transition: 'all 0.3s ease'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem 1rem',
      borderRadius: '0.375rem',
      border: '1px solid rgba(229, 231, 235, 0.2)',
      backgroundColor: 'rgba(31, 41, 55, 0.5)',
      color: 'white',
      transition: 'all 0.3s ease',
      minHeight: '9rem',
      resize: 'none'
    },
    submitBtn: {
      width: '100%',
      padding: '0.75rem 1rem',
      borderRadius: '0.375rem',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      fontWeight: 500,
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    loadingSpinner: {
      width: '1.25rem',
      height: '1.25rem',
      border: '2px solid white',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    contactInfo: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: '2rem',
      borderRadius: '1rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      backgroundColor: 'rgba(31, 41, 55, 0.3)',
      borderRadius: '0.5rem',
      marginBottom: '1rem',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      color: 'inherit'
    },
    socialLinks: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: '2rem',
      borderRadius: '1rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    socialGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: '1rem'
    },
    socialItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem',
      backgroundColor: 'rgba(31, 41, 55, 0.5)',
      border: '1px solid rgba(229, 231, 235, 0.1)',
      borderRadius: '0.5rem',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      color: 'inherit'
    },
    ctaBox: {
      padding: '1.5rem',
      background: 'linear-gradient(to bottom right, rgba(102, 126, 234, 0.1), rgba(102, 126, 234, 0.05))',
      borderRadius: '0.5rem',
      border: '1px solid rgba(102, 126, 234, 0.2)',
      backdropFilter: 'blur(10px)'
    },
    toast: {
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      backgroundColor: '#10B981',
      color: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transform: 'translateY(100px)',
      opacity: 0,
      transition: 'all 0.3s ease',
      zIndex: 100
    }
  };

  return (
    <div className="contact-container" id="contactSection" ref={contactSectionRef} style={styles.contactContainer}>
      {/* Background Elements */}
      <div className="gradient-bg" style={styles.gradientBg}></div>
      
      {/* Floating Shapes */}
      <div ref={floatingShapesRef} id="floatingShapes"></div>
      
      {/* Wave Animation */}
      <div className="wave-animation" style={styles.waveAnimation}></div>
      
      {/* Main Content */}
      <div className="content-wrapper" style={styles.contentWrapper}>
        {/* Section Header */}
        <div className="section-header" style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Let's Work Together</h2>
          <p style={styles.sectionSubtitle}>
            Have a project in mind? I'd love to hear about it. Let's chat about how we can bring your ideas to life.
          </p>
        </div>
        
        {/* Contact Grid */}
        <div className="contact-grid" style={styles.contactGrid}>
          {/* Contact Form */}
          <div className="contact-form" style={styles.contactForm}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-grid" style={styles.formGrid}>
                <div className="form-group" style={styles.formGroup}>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    required 
                    style={styles.input}
                  />
                </div>
                <div className="form-group" style={styles.formGroup}>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" 
                    required 
                    style={styles.input}
                  />
                </div>
              </div>
              
              <div className="form-group" style={styles.formGroup}>
                <input 
                  type="text" 
                  name="subject" 
                  placeholder="Subject" 
                  required 
                  style={styles.input}
                />
              </div>
              
              <div className="form-group" style={styles.formGroup}>
                <textarea 
                  name="message" 
                  placeholder="Your Message" 
                  required 
                  style={styles.textarea}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                style={{
                  ...styles.submitBtn,
                  backgroundColor: isSubmitting ? '#4a5568' : '#667eea'
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner" style={styles.loadingSpinner}></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Contact Info & Social Links */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="contact-info" style={styles.contactInfo}>
              <h3>Get in Touch</h3>
              <div className="space-y-4">
                {/* Email */}
                <a href="mailto:yaabhabye123@gmail.com" className="contact-item" style={styles.contactItem}>
                  <Mail className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="contact-label">Email</div>
                    <div className="contact-value">yaabhabye123@gmail.com</div>
                  </div>
                </a>
                
                {/* Phone */}
                <a href="tel:+233540780219" className="contact-item" style={styles.contactItem}>
                  <Phone className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="contact-label">Phone</div>
                    <div className="contact-value">0540780219 / 0533740393</div>
                  </div>
                </a>
                
                {/* Location */}
                <div className="contact-item" style={styles.contactItem}>
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="contact-label">Location</div>
                    <div className="contact-value">Ghana, Accra/Cape Coast</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="social-links" style={styles.socialLinks}>
              <h3>Follow Me</h3>
              <div className="social-grid" style={styles.socialGrid}>
                {/* LinkedIn */}
                <a href="#" className="social-item" style={styles.socialItem}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
                
                {/* TikTok */}
                <a href="#" className="social-item" style={styles.socialItem}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-2.08v.44a4.83 4.83 0 0 1-3.77 4.25 4.83 4.83 0 0 1-3.77-4.25V2H4.12v.44a4.83 4.83 0 0 1-3.77 4.25A4.83 4.83 0 0 1 4.12 11v9.69a4.84 4.84 0 0 1 3.77 4.25V25h2.08v-.06a4.83 4.83 0 0 1 3.77-4.25 4.83 4.83 0 0 1 3.77 4.25V25h2.08v-.06a4.84 4.84 0 0 1 3.77-4.25V11a4.83 4.83 0 0 1-3.77-4.31z"/>
                  </svg>
                  <span>TikTok</span>
                </a>
                
                {/* Twitter */}
                <a href="#" className="social-item" style={styles.socialItem}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  <span>Twitter</span>
                </a>
                
                {/* Instagram */}
                <a href="#" className="social-item" style={styles.socialItem}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="cta-box" style={styles.ctaBox}>
              <h4>Ready to start your project?</h4>
              <p>I'm always excited to work on new projects and help bring creative ideas to life.</p>
              <button className="cta-button">Let's discuss your project →</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      <div 
        className="toast" 
        style={{
          ...styles.toast,
          transform: showToast ? 'translateY(0)' : 'translateY(100px)',
          opacity: showToast ? 1 : 0
        }}
      >
        <Check className="w-5 h-5" />
        <span>Message sent successfully! I'll get back to you soon.</span>
      </div>

      <style>
        {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes waveScale {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          
          @keyframes waveRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .contact-item:hover {
            background-color: rgba(31, 41, 55, 0.5);
            transform: translateX(5px);
          }
          
          .contact-item:hover .contact-value {
            color: #667eea;
          }
          
          .social-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          
          .social-item:hover svg {
            color: #667eea;
          }
          
          input:focus, textarea:focus {
            outline: none;
            border-color: rgba(102, 126, 234, 0.5);
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            transform: scale(1.05);
          }
          
          .submit-btn:hover:not(:disabled) {
            background-color: #5a6fd1;
          }
          
          .cta-button:hover {
            text-decoration: underline;
            transform: translateX(5px);
          }
          
          @media (min-width: 768px) {
            .form-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
          
          @media (min-width: 1024px) {
            .contact-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
        `}
      </style>
    </div>
  );
};

export default ContactSection;