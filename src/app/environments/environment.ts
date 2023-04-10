export const environment = {
    production: true,
    baseUrl: 'http://spring-security-api-prod.eba-ismfpaip.ap-south-1.elasticbeanstalk.com/api',
    baseUrlDev: 'http://localhost:5000/api',
    signUp: '/auth/register',
    confirmAccount: '/auth/confirm-account',
    resendVerificationToken:'/auth/verification-token',
    resetPasswordToken: '/auth/reset-password',
    resetPassword: '/auth/reset-password/token',
    forgetPasswordToken: '/auth/forget-password',
    forgetPassword: '/auth/forget-password/token',
    login: '/auth/login',
    users: '/user'
}
