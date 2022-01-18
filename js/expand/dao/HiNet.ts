import {getBoarding} from '../../utils/BoardingUtil';
import Constants from './Constants';
/**
 * 发送get请求  类似python里 requests.get
 * @param api 要请求的接口
 */
export function get(api: string) {
  return async (params?: {}) => {
    const boarding = await getBoarding();
    const {headers, url} = Constants;
    return handleData(
      fetch(buildParams(url + api, params), {
        headers: {
          ...headers,
          'boarding-pass': boarding || '',
        },
      }),
    );
  };
}

/**
 * 发送post请求
 * @param api 要请求的接口
 */
export function post(api: string) {
  /**
   * 第一个参数作为body参数，第二个参数作为URL path或者查询参数
   *
   */
  return (params: {}) => {
    return async (queryParams?: {} | string) => {
      const boarding = await getBoarding();
      const {headers, url} = Constants;
      var data = params instanceof FormData ? params : JSON.stringify(params);
      return handleData(
        fetch(buildParams(url + api, queryParams), {
          method: 'POST',
          body: data,
          headers: {
            'content-type': 'application/json',
            ...headers,
            'boarding-pass': boarding || '',
          },
        }),
      );
    };
  };
}

/**
 * 处理接口返回数据
 * @param doAction
 */
function handleData(doAction: Promise<any>) {
  return new Promise((resolve, reject) => {
    doAction
      .then(res => {
        // 解析Content-type 防止将非json数据进行json转换
        const type = res.headers.get('Content-type');
        if ((type || '').indexOf('json') !== -1) {
          return res.json();
        }
        return res.text();
      })
      .then(result => {
        console.log(JSON.stringify(result));
        if (typeof result === 'string') {
          throw new Error(result);
        }
        const {code, msg, data: {list = undefined} = {}} = result;
        if (code === 401) {
          // TODO: 跳转到我们的登陆页面
          return;
        }
        resolve(list || result);
      })
      .catch(e => {
        reject(e);
      });
  });
}

/**
 * 构建url参数
 * @param url
 * @param params
 * @returns
 */
function buildParams(url: string, params?: {} | string): string {
  let newUrl = new URL(url),
    finalUrl;
  //   debugger;
  if (typeof params === 'object') {
    for (const [key, value] of Object.entries(params)) {
      newUrl.searchParams.append(key, value as string);
    }
    finalUrl = newUrl.toString();
  } else if (typeof params === 'string') {
    //  适配path参数
    finalUrl = url.endsWith('/') ? url + params : url + '/' + params;
  } else {
    finalUrl = newUrl.toString();
  }
  console.log('---buildPrams---', finalUrl);
  return finalUrl;
}
