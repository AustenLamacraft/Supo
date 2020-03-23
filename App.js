/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ScanbotSDK from 'react-native-scanbot-sdk';
import { Provider } from 'react-redux';
import { DocumentDirectoryPath, ExternalDirectoryPath } from 'react-native-fs';

import ScannedPagesStore from './ScannedPagesStore';
import HomeScreen from './screens/HomeScreen';


const SDK_LICENSE_KEY = "o+rbC5dHCZ5/QkVkq/NmObKlMk339A" +
"Ib92dJwzEFu643CO22Qzx8guASahQA" +
"JKxVvi5MJeSMtSYLtaK0DkCd8KF9lH" +
"zmMDZfsQy1zOSDsDvMe3r2oxEtVhOd" +
"906eS7WRWaFOVFkroLHBlc9hqiaVDu" +
"q2d//JjeQNZWAhmJ7TidMYi7qVK/AN" +
"XNARzaBRUf2+5OTOzs/vIN6P7+O2sX" +
"zOkAq3iUykSVjdmyVDBTnEfCAu2FYU" +
"FYV0vhkuKzSYZ0o6WUV6divyzNdpYt" +
"s1RlFt+dWlY4HBygtxT38sbmf8fNEQ" +
"SR8KJfKjpuKs46HOHj1LsBZLTqXpFC" +
"7lUhTs/Gh8hQ==\nU2NhbmJvdFNESw" +
"pvcmcudHJpcG9zLnN1cG8KMTU4NzI1" +
"NDM5OQo1OTAKMw==\n";

const MainStack = createStackNavigator({
  Home: HomeScreen,
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#b30127',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

const RootStack = createStackNavigator({
  Main: {
    screen: MainStack,
  },
},
{
  mode: 'modal',
  headerMode: 'none',
});

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return (
        <Provider store={ScannedPagesStore}>
          <AppContainer />
        </Provider>
    );
  }

  componentDidMount() {
    this.initializeSDK();
  }

  async initializeSDK() {
    const options = {
      licenseKey: "",
      loggingEnabled: true, // Consider switching logging OFF in production builds for security and performance reasons!
      storageImageFormat: 'JPG',
      storageImageQuality: 80,
      storageBaseDirectory: this.getCustomStoragePath() // Optional storage path. See comments below!
    };
    try {
      const result = await ScanbotSDK.initializeSDK(options);
      console.log('Scanbot SDK initialization result: ' + JSON.stringify(result));
    } catch (ex) {
      console.error('Scanbot SDK initialization error: ' + JSON.stringify(ex.error));
    }
  }

  getCustomStoragePath(): string {
    // tslint:disable:max-line-length
    // !! Please note !!
    // It is strongly recommended to use the default (secure) storage location of the Scanbot SDK.
    // However, for demo purposes we overwrite the "storageBaseDirectory" of the Scanbot SDK by a custom storage directory.
    //
    // On Android we use the "ExternalDirectoryPath" which is a public(!) folder.
    // All image files and export files (PDF, TIFF, etc) created by the Scanbot SDK in this demo app will be stored
    // in this public storage directory and will be accessible for every(!) app having external storage permissions!
    // Again, this is only for demo purposes, which allows us to easily fetch and check the generated files
    // via Android "adb" CLI tools, Android File Transfer app, Android Studio, etc.
    //
    // On iOS we use the "DocumentDirectoryPath" which is accessible via iTunes file sharing.
    //
    // For more details about the storage system of the Scanbot SDK RN Module please see our docs:
    // - https://scanbotsdk.github.io/documentation/react-native/
    //
    // For more details about the file system on Android and iOS we also recommend to check out:
    // - https://developer.android.com/guide/topics/data/data-storage
    // - https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html
    // tslint:enable:max-line-length

    if (Platform.OS === 'ios') {
      return DocumentDirectoryPath + '/my-custom-storage';
    } else if (Platform.OS === 'android') {
      return ExternalDirectoryPath + '/my-custom-storage';
    }
    return null;
  }

}

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;
