
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
      },
    
    /**
     * Database infos
     * 
     */
    database: "sportDB",
    database_port: "localhost:27042",
    //database_password: process.env.DATABASE_PASSWORD,

    /**
     * Session secret
     * 
     */
    mySecret: "lasagneBolo",

    port: 4242
}