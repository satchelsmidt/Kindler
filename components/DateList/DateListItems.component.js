import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DatesScreen from "../../screens/date_list_flow/DateListScreen.screen";
import DateItemDetailsScreen from "../../screens/date_list_flow/DateItemDetailsScreen.screen";
import DateListItemsScreen from "../../screens/date_list_flow/DateListItemsScreen.screen";


const config = {
    initialRouteName: 'AllDates',
    defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }
}

const AppNavigator = createStackNavigator({
    AllDates: { screen: DatesScreen },
    DateDetails: { screen: DateListItemsScreen },
    DateItem: { screen: DateItemDetailsScreen }
}, config)

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer