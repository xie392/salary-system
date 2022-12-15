import user from "./index";

const reducer = (state: any = { ...user.state }, action: { type: string, val: any }) => {

  const newState = JSON.parse(JSON.stringify(state))

  // 调用
  for (const key in user.key) {
    if (action.type === user.key[key]) {
      user.action[key](newState, action.val)
      break
    }
  }

  // switch (action.type) {
  //   case "add":
  //     newState.name = "111111111"
  //     break
  //   default:
  //     break
  // }

  // console.log("newState", state);


  return newState
}

export default reducer