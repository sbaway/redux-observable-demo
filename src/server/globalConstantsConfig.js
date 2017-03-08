global.__CLIENT__ = false
global.__SERVER__ = true
global.__DEVELOPMENT__ = 'development'
global.__PRODUCTION__ = 'production'
global.__IS_PRODUCTION__ = process.env.NODE_ENV === __PRODUCTION__
global.__IS_DEVELOPMENT__ = !(process.env.NODE_ENV && process.env.NODE_ENV === __PRODUCTION__)
global.__ENV__ = process.env.NODE_ENV && process.env.NODE_ENV === __PRODUCTION__ ? __PRODUCTION__ : __DEVELOPMENT__
global.SYSTEM_PATH = process.cwd()
