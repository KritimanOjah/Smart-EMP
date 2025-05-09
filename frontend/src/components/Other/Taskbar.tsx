export default function Footer() {
  return (
    <footer className="w-full bg-[#280f03] text-[#fde9ce] py-12 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">EmployeePro</h3>
          <p className="text-sm leading-relaxed">
            Enterprise-grade workforce management solutions for modern organizations.
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              v1.0.1
            </span>
            <span className="text-xs text-[#fde9ce]">Production</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Navigation</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/dashboard" className="hover:text-white transition-colors">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/employees" className="hover:text-white transition-colors">
                Employee Directory
              </a>
            </li>
            <li>
              <a href="/tasks" className="hover:text-white transition-colors">
                Task Management
              </a>
            </li>
            <li>
              <a href="/reports" className="hover:text-white transition-colors">
                Analytics
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/security" className="hover:text-white transition-colors">
                Security
              </a>
            </li>
            <li>
              <a href="/compliance" className="hover:text-white transition-colors">
                Compliance
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
          <address className="not-italic text-sm space-y-3">
            <p>123 Enterprise Blvd</p>
            <p>San Francisco, CA 94107</p>
            <p>
              <a href="mailto:support@employeepro.com" className="hover:text-white transition-colors">
                support@employeepro.com
              </a>
            </p>
            <p>
              <a href="tel:+18005551234" className="hover:text-white transition-colors">
                (800) 555-1234
              </a>
            </p>
          </address>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#fde9ce] flex flex-col md:flex-row justify-between items-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} EmployeePro Systems. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="sr-only">LinkedIn</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="sr-only">Twitter</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}