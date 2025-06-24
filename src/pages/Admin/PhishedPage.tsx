import React from "react";
import {
  AlertTriangle,
  Shield,
  CheckCircle,
  X,
  Lock,
  Mail,
  Eye,
} from "lucide-react";

const PhishedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white text-center">
          <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">⚠️ PHISHING ATTEMPT DETECTED!</h1>
          <p className="text-red-100 mt-2">
            This was a simulated phishing attack
          </p>
        </div>

        {/* Education Content */}
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold text-red-800 mb-2">
                🎯 You've Been Caught in a Training Exercise
              </h2>
              <p className="text-red-700">
                Don't worry! This was a controlled phishing simulation designed
                to help you learn.
              </p>
            </div>
          </div>

          {/* Warning Signs */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Red Flags You Should Have Noticed:
            </h3>
            <ul className="space-y-3 text-yellow-700">
              <li className="flex items-start">
                <X className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Suspicious URL:</strong> Always check the URL
                  carefully - legitimate sites use HTTPS and official domains
                </span>
              </li>
              <li className="flex items-start">
                <X className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Urgent language:</strong> Phishers create false
                  urgency to pressure quick actions
                </span>
              </li>
              <li className="flex items-start">
                <X className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Unsolicited request:</strong> Legitimate companies
                  rarely ask for passwords via email links
                </span>
              </li>
              <li className="flex items-start">
                <X className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Generic design:</strong> Professional sites have
                  consistent branding and fewer errors
                </span>
              </li>
            </ul>
          </div>

          {/* Best Practices */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              How to Protect Yourself:
            </h3>
            <ul className="space-y-3 text-green-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Verify the sender:</strong> Contact your IT department
                  or the company directly
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Check URLs carefully:</strong> Hover over links to see
                  the real destination
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Use multi-factor authentication:</strong> Enable 2FA
                  wherever possible
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Report suspicious emails:</strong> Forward phishing
                  attempts to your security team
                </span>
              </li>
            </ul>
          </div>

          {/* Statistics */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Did You Know?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">95%</div>
                <div className="text-sm">
                  of successful cyberattacks start with phishing
                </div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">1 in 4</div>
                <div className="text-sm">
                  employees fall for phishing attempts
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mb-6">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Return to Dashboard
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Take Training Again
            </button>
          </div>

          {/* Additional Resources */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg">
            <div className="text-center">
              <Lock className="w-8 h-8 mx-auto text-purple-600 mb-2" />
              <h4 className="font-semibold text-purple-800 mb-2">
                Continue Your Cybersecurity Training
              </h4>
              <p className="text-purple-700 text-sm mb-3">
                Stay ahead of cyber threats with our comprehensive security
                awareness program
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                  Phishing Prevention
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                  Password Security
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                  Social Engineering
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                  Data Protection
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>
              This simulation helps protect our organization by building
              cybersecurity awareness.
            </p>
            <p className="mt-1">Questions? Contact your IT Security Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhishedPage;
