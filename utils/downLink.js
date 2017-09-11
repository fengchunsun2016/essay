  export const genFileDownLink = async  (result)=> {
  const disposition = result.headers.get('Content-Disposition')
  if (!disposition) return;
  const fileName = decodeURI(disposition.split('filename=')[1]);
  const data = await result.blob();
  const blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
  const windowUrl = window.URL || window.webkitURL;
  const url = windowUrl.createObjectURL(blob);
  const ele = document.createElement('a');
  ele.setAttribute('href', url);
  ele.setAttribute('download', fileName);
  const event = document.createEvent('MouseEvents');
  event.initEvent('click', true, true);
  ele.dispatchEvent(event);
};

export default { genFileDownLink };
