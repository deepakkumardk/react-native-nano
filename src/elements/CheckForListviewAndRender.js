import isEqual from 'lodash/isEqual';
import React from 'react';
import {GetContextProvider} from '../context/DataContext';
import {getPlatform} from '../modules/platform/platform';
import NanoBottomTabs from '../navigation/bottomtabs/BottomTabs';
// import DrawerNavigation from '../navigation/drawer/Drawer';
import NanoTopTabs from '../navigation/toptabs/TopTabs';
import NANO from '../utils/Constants';
import {
  checkNameAndRenderCustomComponent,
  getInterceptedFunctionProps,
  getViewItems,
  heightAndWidthFormatterForComponentObj,
  onElementLoaded,
} from '../utils/Utilities';
import NanoFlatlist from './Flatlist';
import RecycleTestComponent from './RecyclerlistView';
import UniversalElement from './UniversalElement';

function CheckForListviewAndRender({
  elemOb,
  navigation,
  onPress,
  onLongPress,
  route,
  customComponents,
  databaseConfigObject,
  propParameters,
  funProps,
  onPressCallBack,
  logicObject,
  getUi,
  index,
  themes,
  unModifiedElemOb,
}) {
  const context = GetContextProvider();
  if (
    elemOb['platform'] != null &&
    elemOb['platform'].length > 0 &&
    !elemOb['platform'].includes(getPlatform())
  ) {
    return null;
  }
  switch (elemOb['component']) {
    case NANO.LIST_VIEW:
      // console.log('list data', elemOb);
      // console.log(
      //   'ssssss',
      //   elemOb['listData'],
      //   propParameters['uiElements']['v1'][0]['listData'],
      // );

      if (elemOb['hide'] != null && elemOb['hide'] == true) {
        return null;
      }
      const heightWeightFormattedElemObj =
        heightAndWidthFormatterForComponentObj(elemOb);
      return (
        <RecycleTestComponent
          {...heightWeightFormattedElemObj}
          navigation={navigation}
          onPress={onPress}
          route={route}
          onLongPress={onLongPress}
          onPressCallBack={onPressCallBack}
          propParameters={propParameters}
          funProps={funProps}
          getUi={getUi}
          logicObject={logicObject}
          themes={themes}
          unModifiedElemOb={unModifiedElemOb}
          context={context}
        />
      );

    case NANO.FLAT_LIST:
      // console.log('flatlist', elemOb);
      // return null;
      return (
        <NanoFlatlist
          {...elemOb}
          navigation={navigation}
          onPress={onPress}
          onLongPress={onLongPress}
          route={route}
          onPressCallBack={onPressCallBack}
          propParameters={propParameters}
          funProps={funProps}
          logicObject={logicObject}
          themes={themes}
          unModifiedElemOb={unModifiedElemOb}
        />
      );

    case NANO.TOP_TABS:
      return (
        <NanoTopTabs
          drawerObj={elemOb}
          navigation={navigation}
          route={route}
          onLongPress={onLongPress}
          databaseConfigObject={databaseConfigObject}
          onPressCallBack={onPressCallBack}
          propParameters={propParameters}
          unModifiedElemOb={unModifiedElemOb}
          funProps={funProps}
          logicObject={logicObject}
          themes={themes}
        />
      );
    case NANO.BOTTOM_TABS:
      return (
        <NanoBottomTabs
          drawerObj={elemOb}
          navigation={navigation}
          route={route}
          databaseConfigObject={databaseConfigObject}
          onLongPress={onLongPress}
          onPressCallBack={onPressCallBack}
          propParameters={propParameters}
          unModifiedElemOb={unModifiedElemOb}
          funProps={funProps}
          logicObject={logicObject}
          themes={themes}
        />
      );

    // case NANO.DRAWER:
    //   return (
    //     <DrawerNavigation
    //       drawerObj={elemOb}
    //       navigation={navigation}
    //       route={route}
    //       databaseConfigObject={databaseConfigObject}
    //     />
    //   );

    default:
      const funProps = getInterceptedFunctionProps({
        eleObject: elemOb,
        props: {
          moduleParams: propParameters,

          setUi: onPressCallBack,
          getUi: getUi,
        },
      });
      const elementProps = {
        ...elemOb,
        ...funProps,
      };
      const getViewItemsUpdated = (
        contentArr,
        shouldOnpPressAllowed,
        onComponentLoaded,
        uniKey = index,
      ) => {
        return getViewItems({
          content: contentArr,
          customComponents,
          getUi,
          onElementLoaded,
          onPressCallBack,
          propParameters,

          uniqueKey: uniKey,
        });
      };
      const Custom = checkNameAndRenderCustomComponent({
        componentName: elemOb['component'],
        compsArray: customComponents,
        props: propParameters,
        onElementLoaded: onElementLoaded,
        elementProps,
        getViewItems: getViewItemsUpdated,
      });

      if (Custom) {
        return Custom;
      }
      


      return (
        <UniversalElement
          elemObj={elemOb}
          customComponents={customComponents}
          onPressCallBack={onPressCallBack}
          propParameters={propParameters}
          getUi={getUi}
          key={index}
          uniqueKey={index}
          themes={themes}
          unModifiedElemOb={unModifiedElemOb}
        />
      );
  }
}

function areEqual(prevProps, nextProps) {
  /*
    return true if passing nextProps to render would return
    the same result as passing prevProps to render,
    otherwise return false
    */
  if (isEqual(nextProps, prevProps)) {
    return true;
  } else {
    return false;
  }
}
export default React.memo(CheckForListviewAndRender, areEqual);

// export default CheckForListviewAndRender;
