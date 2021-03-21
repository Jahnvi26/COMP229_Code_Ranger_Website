/* File name: app.js
Name: Spandan Patel
Student Id: 301160189
Date: 15/02/2021
ExpressPortfolio
Copyright © 2021 Centennial College. All rights reserved.*/


(function(){
    function Start(){
        console.log("App Started!");

        let deleteButtons = document.querySelectorAll('.info-link-table-delete');

        for(button of deleteButtons)
        {
            button.addEventListener('click', (event)=> {
                if(!confirm("Are you sure?"))
                {
                    event.preventDefault();
                    window.location.assign('/business-list');
                }
            });
        }
    }

    window.addEventListener("load", Start);
})();

