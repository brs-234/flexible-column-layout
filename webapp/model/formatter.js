sap.ui.define([

], () => {

    "use strict"

    return {
        formatPicture : function(sBase64){
            if (sBase64) {
                return "data:image/png;base64," + sBase64;
            }
            return "";
        }
    }

})