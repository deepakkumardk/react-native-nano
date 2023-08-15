import React, {useEffect} from 'react';
import {TextInput as PaperTextInput} from 'react-native-paper';

function TextInput({
  heightWeightFormattedElemObj,
  isOnPressAllowed,
  onPress,
  onLongPress,
  funProps,
  elemOb,
  onElementLoaded,
}) {
  useEffect(() => {
    onElementLoaded(elemOb);
  }, []);
  return (
    <PaperTextInput
      {...heightWeightFormattedElemObj['props']}
      onPress={
        isOnPressAllowed
          ? () => {
              onPress({itemJson: elemOb});
            }
          : null
      }
      // style={{}}
      scrollEnabled={false}
      value={elemOb['value']}
      onLongPress={isOnPressAllowed ? onLongPress : null}
      {...funProps}
    />
  );
}

export default TextInput;