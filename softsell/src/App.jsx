import { useState, useEffect } from 'react'
import { FiUpload, FiDollarSign, FiCheckCircle, FiMoon, FiSun } from 'react-icons/fi'
import { BsShieldCheck, BsSpeedometer, BsClock } from 'react-icons/bs'
import { motion } from 'framer-motion'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: ''
  })

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = 'Name is required'
    if (!formData.email.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email format'
    if (!formData.company.trim()) errors.company = 'Company is required'
    if (!formData.licenseType) errors.licenseType = 'Please select a license type'
    if (!formData.message.trim()) errors.message = 'Message is required'
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData)
      // Here you would typically send the data to a backend
      setFormData({
        name: '',
        email: '',
        company: '',
        licenseType: '',
        message: ''
      })
      setFormErrors({})
    } else {
      setFormErrors(errors)
    }
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const handleChatSubmit = async (e) => {
    e.preventDefault()
    if (!userInput.trim()) return

    const newMessage = { role: 'user', content: userInput }
    setChatMessages([...chatMessages, newMessage])
    setUserInput('')

    // Mock AI response - replace with actual OpenAI integration
    const mockResponses = {
      "How do I sell my license?": "To sell your license, simply upload your license details through our secure platform. We will provide a valuation within 24 hours and process the transaction securely.",
      "What types of licenses do you buy?": "We purchase various software licenses including enterprise software, development tools, and cloud service subscriptions. Contact us for a specific evaluation.",
      "How long does the process take?": "Our process typically takes 48 hours from submission to payment. This includes license verification and secure payment processing."
    }

    setTimeout(() => {
      const response = mockResponses[userInput] || 'Please contact our support team for specific assistance with your query.'
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }])
    }, 1000)
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Dark Mode Toggle */}
      <motion.button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white z-50 shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {darkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
      </motion.button>

      {/* Chat Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        {chatOpen ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-80 overflow-hidden"
          >
            <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
              <h3 className="font-semibold">Chat Support</h3>
              <button onClick={() => setChatOpen(false)}>&times;</button>
            </div>
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`${msg.role === 'user' ? 'ml-auto bg-blue-100 dark:bg-blue-900' : 'mr-auto bg-gray-100 dark:bg-gray-700'} p-2 rounded-lg max-w-[80%]`}>
                  {msg.content}
                </div>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} className="p-4 border-t dark:border-gray-700">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask a question..."
                className="w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
            </form>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setChatOpen(true)}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg"
          >
            Chat Support
          </motion.button>
        )}
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 dark:from-blue-900 dark:to-indigo-900">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Transform Your Unused Software Licenses into Cash</h1>
          <p className="text-xl mb-8">Get the best value for your surplus software licenses with our secure and efficient platform</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition">Get a Quote</button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[['Upload License', FiUpload], ['Get Valuation', FiDollarSign], ['Get Paid', FiCheckCircle]].map(([title, Icon], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6"
              >
                <Icon className="w-12 h-12 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {{
                    'Upload License': 'Share your license details through our secure platform',
                    'Get Valuation': 'Receive a competitive quote within 24 hours',
                    'Get Paid': 'Quick and secure payment processing'
                  }[title]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <BsShieldCheck className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
              <p className="text-gray-600">Bank-level security for all your license transfers</p>
            </div>
            <div className="p-6 border rounded-lg">
              <BsSpeedometer className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Best Market Value</h3>
              <p className="text-gray-600">Get top dollar for your software licenses</p>
            </div>
            <div className="p-6 border rounded-lg">
              <BsClock className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Process</h3>
              <p className="text-gray-600">Complete transactions within 48 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">What Our Customers Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-gray-600 mb-4">"SoftSell made it incredibly easy to recover value from our unused licenses. The process was smooth and professional."</p>
              <div>
                <p className="font-semibold">Sarah Johnson</p>
                <p className="text-gray-500">IT Director, TechCorp Inc.</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-gray-600 mb-4">"We were amazed by how quickly we could convert our surplus licenses into cash. Excellent service!"</p>
              <div>
                <p className="font-semibold">Michael Chen</p>
                <p className="text-gray-500">CTO, Innovation Labs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Get Started</h2>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
            <div>
              <input
                type="text"
                className={`w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-900 dark:text-white ${formErrors.name ? 'border-red-500' : ''}`}
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({...formData, name: e.target.value})
                  if (formErrors.name) {
                    const newErrors = {...formErrors}
                    delete newErrors.name
                    setFormErrors(newErrors)
                  }
                }}
              />
              {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                className={`w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-900 dark:text-white ${formErrors.email ? 'border-red-500' : ''}`}
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => {
                  setFormData({...formData, email: e.target.value})
                  if (formErrors.email) {
                    const newErrors = {...formErrors}
                    delete newErrors.email
                    setFormErrors(newErrors)
                  }
                }}
              />
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>

            <div>
              <input
                type="text"
                className={`w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-900 dark:text-white ${formErrors.company ? 'border-red-500' : ''}`}
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => {
                  setFormData({...formData, company: e.target.value})
                  if (formErrors.company) {
                    const newErrors = {...formErrors}
                    delete newErrors.company
                    setFormErrors(newErrors)
                  }
                }}
              />
              {formErrors.company && <p className="text-red-500 text-sm mt-1">{formErrors.company}</p>}
            </div>

            <div>
              <select
                className={`w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-900 dark:text-white ${formErrors.licenseType ? 'border-red-500' : ''}`}
                value={formData.licenseType}
                onChange={(e) => {
                  setFormData({...formData, licenseType: e.target.value})
                  if (formErrors.licenseType) {
                    const newErrors = {...formErrors}
                    delete newErrors.licenseType
                    setFormErrors(newErrors)
                  }
                }}
              >
                <option value="">Select License Type</option>
                <option value="enterprise">Enterprise</option>
                <option value="professional">Professional</option>
                <option value="standard">Standard</option>
              </select>
              {formErrors.licenseType && <p className="text-red-500 text-sm mt-1">{formErrors.licenseType}</p>}
            </div>

            <div>
              <textarea
                className={`w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-900 dark:text-white h-32 ${formErrors.message ? 'border-red-500' : ''}`}
                placeholder="Tell us about your licenses"
                value={formData.message}
                onChange={(e) => {
                  setFormData({...formData, message: e.target.value})
                  if (formErrors.message) {
                    const newErrors = {...formErrors}
                    delete newErrors.message
                    setFormErrors(newErrors)
                  }
                }}
              />
              {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default App
