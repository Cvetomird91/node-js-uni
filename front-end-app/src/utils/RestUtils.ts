export default class RestUtils {
    public static checkStatus(response: any) {
        if (response.ok) {
          return response;
        } else {
          const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
          };
          console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);
      
          let errorMessage = RestUtils.translateStatusToErrorMessage(httpErrorInfo.status);
          throw new Error(errorMessage);
        }
      }
    
    private static translateStatusToErrorMessage(status: number) {
        switch (status) {
          case 500:
            return 'Server error';
          default:
            return 'There was an error retrieving the project(s). Please try again.';
      }
    }

    public static parseJSON(response: Response) {
        return response.json();
    }
    
}