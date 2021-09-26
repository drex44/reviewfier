export function getFormData(formSelector){
  var unindexed_array = $(formSelector).serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function(n, i){
      indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
}
