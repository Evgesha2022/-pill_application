import { DeviceThemeProvider } from '@salutejs/plasma-ui';

function AddTab(){
    return(
        <DeviceThemeProvider>
            <h1> Здесь будет текст</h1>
        </DeviceThemeProvider>
    );
}
export {AddTab}