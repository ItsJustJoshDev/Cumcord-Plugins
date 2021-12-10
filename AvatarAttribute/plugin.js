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

  const friendRow = webpack.findByDisplayName("PeopleListItem");
  const getPrimaryColorForAvatar = webpack.findByProps(
    "getPrimaryColorForAvatar"
  );

  function cacheUser(user, props) {
    let savedUser = null;
    let shouldSave = false;
    let intEncodedColor = null;


    // Fetch user, so that we update it (and not overwrite)
    if (userCache[user.id]) {
      savedUser = userCache[user.id];
    } else {
      savedUser = ghostStore[userId];
      if (!savedUser) {
        savedUser = {
          bannerURL: null,
        };
      }
    }

    // Check for a diff if the user was saved
    if (
      !(user.bannerURL == null && user.accentColor == null) &&
      user.bannerURL != savedUser.bannerURL
    ) {
      savedUser.bannerURL = user.bannerURL;
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

      if (!userCache[userId]) {
        userCache[userId] = {
          bannerURL: null,
        };
      }
    }
    return userCache[userId];
  }

  return {
    onLoad() {
      document.body.addEventListener("mousemove", mouseEventBind("mouse"));
      document.body.addEventListener("mousedown", mouseEventBind("click"));

      injections.push(
        after("render", friendRow.prototype, (_, res) => {
          try {
            const items = res.props.children();
            const userObj = findInReactTree(items, (e) => e && e.user)?.user;
            const userData = fetchUser(userObj.id);

            // Add the attributes
            const modified = React.cloneElement(items.props.children, {
              // return discord props which get lost during injection
              role: "wrapper",
              "data-user-id": `people-list___${userObj.id}`,
              tabindex: -1,

              // inject additional props
              "data-user-id": userObj.id,
              "data-banner-url": userData.bannerURL,
              "data-accent-color": accentColor,

              // style
              style: {
                "--user-banner": userData.bannerURL
                  ? `url("${userData.bannerURL}")`
                  : null,
                "--user-accent-color": accentColor,
                ...items.props.children.props.style,
              },
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
      document.body.removeEventListener("mousemove", mouseEventBind("mouse"));
      document.body.removeEventListener("mousedown", mouseEventBind("click"));

      for (let i = 0; i < injections.length; i++) {
        injections[i]();
      }
      injections.length = 0;
    },
  };
};
