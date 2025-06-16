import React, { useEffect } from 'react'

const Callback = () => {
  useEffect(() => {
    const { ApperUI } = window.ApperSDK;
    ApperUI.showSSOVerify("#authentication-callback");
  }, []);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div id="authentication-callback" className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      </div>
    </div>
  )
}

export default Callback