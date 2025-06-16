import { useEffect } from 'react';

const PromptPassword = () => {
    useEffect(() => {
        const { ApperUI } = window.ApperSDK;
        ApperUI.showPromptPassword('#authentication-prompt-password');
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div id="authentication-prompt-password" className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            </div>
        </div>
    );
};

export default PromptPassword;