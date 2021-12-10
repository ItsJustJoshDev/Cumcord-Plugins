import { log } from "@cumcord/utils/logger";
import { findInReactTree } from "@cumcord/utils";
import { after } from "@cumcord/patcher";
import { webpack } from "@cumcord/modules";
import { React } from "@cumcord/modules/common";

let injections = [];

export default (data) => {
  const userCache = {};
  const store = data.persist.store;
  const ghostStore = data.persist.ghost;

  const userId = webpack.findByProps('img');
  const el = webpack.setAttribute('data-user-id', userId);
  const getPrimaryColorForAvatar = webpack.findByProps(
    "getPrimaryColorForAvatar"
  );

  const handler = async () => {
    const els = document.getElementsByClassName('wrapper-3t9DeA');

    let interval;

    for (let _el of els) {
      if (webpack.getAttribute('data-user-id')) continue;
  
    }
  };

  function mouseEventBind(param) {
    return function (e) {
      // Get the element
      e = e || window.event;
      let target = e.target || e.srcElement;
      let foundTarget = false;



  function cacheUser(user, props) {
    let savedUser = null;
    let shouldSave = false;
    let intEncodedColor = null;

    // Fetch user, so that we update it (and not overwrite)
    if (userCache[user.id]) {
      savedUser = userCache[user.id];
    } else {
      savedUser = ghostStore[userId];
    }

    if (user.accentColor && user.accentColor != savedUser.accentColor) {
      savedUser.accentColor = user.accentColor;
      shouldSave = true;
    }
    if (
      props?.accentColorGenerated &&
      intEncodedColor != savedUser.autoAccent
    ) {
      savedUser.autoAccent = intEncodedColor;
      shouldSave = true;
    }

    if (shouldSave) {
      store[user.id] = savedUser;
      userCache[user.id] = savedUser;
      console.log(
        "[Hyblocker's Theme Helper]",
        `Cached user "${user.username}#${user.discriminator}"!`
      );
    }
  }

  function fetchUser(userId) {
    if (!userCache[userId]) {
      userCache[userId] = ghostStore[userId];
    }
    return userCache[userId];
  }

  return {
    onLoad() {
      injections.push(
        after("render", userId.prototype, (_, res) => {
          try {
            const items = res.props.children();
            const userObj = findInReactTree(items, (e) => e && e.user)?.user;
            const userData = fetchUser(userObj.id);

            if (userObj.accentColor) {
              cacheUser(userObj);
            } else {
              // fallback to autogen
              getPrimaryColorForAvatar
                .getPrimaryColorForAvatar(userObj.getAvatarURL())
                .then((args) =>
                  cacheUser(userObj, { accentColorGenerated: args })
                );

            }


            // Add the attributes
            const modified = React.cloneElement(items.props.children, {
              // return discord props which get lost during injection
              role: "listitem",
              "data-list-item-id": `people-list___${userObj.id}`,
              tabindex: -1,

              // inject additional props
              "data-user-id": userObj.id,

            });

            res.props.children = () => {
              return modified;
            };

            return res;
          } catch (ex) {
            log(`[FATAL]: ${ex}`);
            return res;
          }
        })
      );
    },

    onUnload() {
      log("I've been unloaded!");
      clearInterval(interval);
      for (let i = 0; i < injections.length; i++) {
        injections[i]();
      }
      injections.length = 0;
      }, 
     };
    }
  } 
};