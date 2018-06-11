module.exports = {

  getConnection: (pool) => {
    return new Promise((resolve, reject) => {

      pool.getConnection( (err, con) => {
        console.log('getConnection 실행됨');
        if(err){
          if(con) con.release();
          reject(err)
        } else {
          resolve(con);
        }

      })
    })
  },

  releaseCon: (con) => {
    con.release();
  },

/* ===== USER ===== */
  selectAllUserQuery: (con) => {
      return new Promise( (resolve, reject) => {
        let query = ``;
        let exec = con.query(query, ( err, result ) => {
          console.log('모든 유저 조회 SQL : ',exec.sql);

          if (err) {
            con.release();
            reject(err);
          }

          resolve(result);
        })
      })
  },

}
