import axios from 'axios'
import { SERVER_HOST } from '../constants';
import { consoleLogger } from '../utils/logger'

export const get_table = async (table: string) => {
    const config = {
        method: 'GET'
      }
    consoleLogger(SERVER_HOST + '/query/' + table)
    const options =  await axios(SERVER_HOST + '/query/' + table +'/', config)
      .then((response) => { 
        const options = response.data;
        options.forEach(element => {
            element['value'] = element['id'];
            element['label'] = element['description'];
            delete(element['id']);
            delete(element['description']);
        });
        consoleLogger('options', options);
        return options
        })
      .catch((response) => {
        consoleLogger(response);
        return []
      });
      return options;
}

export const get_file = async (input_type: string, sampleId: number, file_name: string, user) => {
    const config = {
        method: 'GET',
        headers: {'Authorization': user ? "Bearer " + user.accessToken : null},
         responseType: 'blob' as 'text'
      }
    consoleLogger(SERVER_HOST + '/query/sample/' + sampleId +'/' + input_type)
    const options =  await axios(SERVER_HOST + 'query/sample/' + sampleId +'/' + input_type + '/', config)
      .then((response) => { 
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', file_name); //or any other extension
        document.body.appendChild(link);
        link.click();
    
        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
        })
      .catch((response) => {
        consoleLogger(response);
        return []
      });
      return options;
}

export const publish_sample = async (sampleId: number, user) => {
    const config = {
        method: 'PUT',
        headers: {'Authorization': user ? "Bearer " + user.accessToken : null}
      }
    const options =  await axios(SERVER_HOST + 'share/public/' + sampleId + '/', config)
      .then((response) => { 
        const options = response;
        consoleLogger('publish sample', response)
        return options
        })
      .catch((response) => {
        consoleLogger(response);
        return []
      });
      return options;
}