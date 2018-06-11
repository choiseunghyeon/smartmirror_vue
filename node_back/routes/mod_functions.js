module.exports = {
  verdictAdminSession : (session) => { // admin이 아니면 -1 return

    if(session.hasOwnProperty('userdata')) // 프로퍼티 검증 없이 프로퍼티를 찾으면 서버가 터져버림
      return session.userdata.user_rank == 1  ? 1 : -1;
    else
      return -1;

  },

  getSessionUserId: (session) => { //session의 user_id return

    return session.hasOwnProperty('userdata') ? session.userdata.user_id : -1;

  },

} /* the end of module.exports */
