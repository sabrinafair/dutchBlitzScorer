// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Animated, Alert } from 'react-native';

// //Import utils
// // import { SnackbarProps } from './types';
// //Import assets
// // import { images } from '../../assets';

// // import { SnackBarStyle } from './style';

// interface SnackbarProps {
//     position: string,
//     header: string,
//     message: string,
//     snackBarType: string,
//     duration: number,
//     actionLabel?: string,
//     onActionPress?: () => void,
//     onDismissSnackbar? : () => void,
//     isPermanent: boolean,
//   }

// const Snackbar: React.FC<SnackbarProps> = ({
//   position = 'Bottom',
//   header,
//   message,
//   snackBarType,
//   duration = 60000,
//   actionLabel,
//   onActionPress,
//   onDismissSnackbar,
//   isPermanent = false,
// }) => {
//   console.log('snack',header,message,snackBarType,
//   duration,
//   actionLabel,
//   onActionPress,
//   onDismissSnackbar,
//   isPermanent);
  
//   const [isVisible, setIsVisible] = useState<boolean>(false);
//   const fadeAnim = useState<Animated.Value>(new Animated.Value(0))[0];

//   useEffect(() => {
//     showSnackbar();
//   }, []);

//   const showSnackbar = () => {
//     setIsVisible(true);
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => {
//       if (!isPermanent) {
//         console.log("Snackbar")
//         setTimeout(() => {
//           hideSnackbar();
//         }, duration);
//       }

//     });
//   };

//   const hideSnackbar = () => {
//     Animated.timing(fadeAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => {
//       setIsVisible(false);
//       onDismissSnackbar?.();
//     });
//   };

//   const handleActionPress = () => {
//     hideSnackbar();
//     onActionPress?.();
//   };

//   let icon: React.ReactNode;
//   switch (snackBarType) {
//     case 'Success':
//       icon = <images.TaskSubmitSuccess />;
//       break;
//     case 'Failure':
//       icon = <images.Cancelcon />;
//       break;
//     case 'Offline':
//       icon = <images.Offline />;
//       break;
//     default:
//       break;
//   }

//   return isVisible ? (
//     <Animated.View
//       style={[
//         SnackBarStyle.SnackbarContainer,
//         SnackBarStyle[position],
//         SnackBarStyle[snackBarType],
//         { opacity: fadeAnim },
//       ]}>
//       <View style={SnackBarStyle.SnackbarContentContainer}>
//         <View style={SnackBarStyle.IconAndMessageContainer}> 
//           {icon}
//           <View style={SnackBarStyle.MessageContainer}>
//             {header && <Text style={SnackBarStyle.HeaderStyle}>{header}</Text>}
//             <Text style={SnackBarStyle.MessageText}>{message}</Text>
//           </View>
//         </View>
//         {actionLabel && (
//           <TouchableOpacity onPress={handleActionPress}>
//             <Text style={SnackBarStyle.ActionLabel}>{actionLabel}</Text>
//           </TouchableOpacity>
//         )} 
//       </View>
//     </Animated.View>
//   ) : null;
// };

// //Specifies the default props
// // Snackbar.defaultProps = {
// //   actionLabel: null,
// // };

// export default Snackbar;