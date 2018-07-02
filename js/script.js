/************************************************/
var lat=30.7243837;
var long=76.771263;
var flag=0;
//ADDED GELOCATION API FIR GETTING USER CURRENT LOCATION
function getLocation() {
    if (navigator.geolocation) {
        //navigator.geolocation.getCurrentPosition(showPosition);
        flag++;
        if(flag%2 == 0) //when form content disappears
        {
            document.getElementById('center-image').style.marginTop = "6vw";
        }
        else if(flag%2 != 0) //when form content appears
        {
            document.getElementById('center-image').style.marginTop = "-9.05vw";
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }
    else { 
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) 
{
    /*x.innerHTML = */
    lat = position.coords.latitude;
    long = position.coords.longitude;
    //alert("Latitude: " + lat + "\nLongitude: " + long);
}

//FUNCTION FOR MANUAL CUSTOMISATION
var single=0; //select of cost
var double=0;
var triple=0;
var custom=0;
function selectbed()
{
    var a = document.getElementById('typebed');
    if(a.value=="custom")
    {
        //alert("doing");
        custom=1;
        document.getElementById('id01').style.display='block';
    }
    else if(a.value=="single")
    {
        single=100; //setting cost of single bed
    }
    else if(a.value=="double")
    {
        double=200; //setting cost of double bed
    }
    else if(a.value=="triple")
    {
        triple=300; //setting cost of triple bed
    }
}

//FUNCTIONS FOR DRAG AND DROP API
var singlebed=0;
var sofa=0;
var wifi=0;
var doublebed=0;
var costofonecustom=0;
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    var data = ev.dataTransfer.getData("text");
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    var c1=0;
    var c2=0;
    var c3=0;
    var c4=0;
    if(data=="drag1" || data=="drag7")
    {
        singlebed++;
        document.getElementById('sbed').innerHTML = singlebed;
        //adding cost
        c1 = c1 + 70; //cost of 1 single bed
        document.getElementById('c1').innerHTML = c1;
    }
    else if(data=="drag2" || data=="drag5")
    {
        sofa++;
        document.getElementById('sfa').innerHTML = sofa;
        c2 = c2 + 50; //csot of 1 sofa
        document.getElementById('c2').innerHTML = c2;
    }
    else if(data=="drag3" || data=="drag6" || data=="drag9")
    {
        wifi++;
        document.getElementById('wfi').innerHTML = wifi;
        c3 = c3 + 30; //cost of 1 wifi
        document.getElementById('c3').innerHTML = c3;
    }
    else if(data=="drag4" || data=="drag8")
    {
        doublebed++;
        document.getElementById('dbed').innerHTML = doublebed;
        c4 = c4 + 100; //cost 1 doublebed
        document.getElementById('c4').innerHTML = c4;
    }
    //finding total cost of 1 custom room
    costofonecustom = costofonecustom+c1+c2+c3+c4;
    document.getElementById('total-c').innerHTML = costofonecustom;
}

function sub()
{
    var ans = confirm("Are you sure ??");
    if(ans==true)
    {
        document.getElementById('id01').style.display='none';
        alert("Custom Room Data Submitted");
    }
}
//THE MAIN FUNCTION
function done()
{
    var d1 = document.getElementById('d1');
    var d2 = document.getElementById('d2');
    if(!d1.value)
    {
        alert("Enter the Check In date");
    }
    else if(!d2.value)
    {
        alert("Enter the Check Out date");
    }
    else if(d1.value && d2.value)
    {
        alert("Data Submitted Successfully");
        document.getElementById('hide').style.display="block";
        //getting image
        var but = document.getElementById('submit-hide');
        //making a string
        var str="";
        if(lat!=0 && long!=0)
        {
            str = lat+long;
        }
        str = "https://www.google.co.in/maps/search/oyo+hotels/@"+lat+","+long+",14z";///data=!3m1!4b1";
        but.setAttribute("href",str);
        document.getElementById('center-image').style.marginTop = "-12.5vw";
        
        /*******/
        /*FOR FINAL BILL*/
        var get = document.getElementById('typenumber');
        var bd = document.getElementById('typebed');
        if(bd.value=="single")
        {
            single *= get.value;
            //alert("cost single: "+single);
        }
        else if(bd.value=="double")
        {
            double *= get.value;
            //alert("cost double: "+double);
        }
        else if(bd.value=="triple")
        {
            triple *= get.value;
            //alert("cost triple: "+triple);
        }
        else if(bd.value =="custom")
        {
            //custom = singlebed*1 + sofa*1 + wifi*1 + doublebed*1;
            custom = costofonecustom*get.value;
            //alert("cost custom: "+custom);
        }
        var cart=0;
        if(single!=0)
        {
            cart++;
        }
        else if(double!=0)
        {
            cart++;
        }
        else if(triple!=0)
        {
            cart++;
        }
        else if(custom!=0)
        {
            cart++;
        }
        document.getElementById('cart').innerHTML = cart;
        //setting values to the cart
        document.getElementsByClassName('col-2-right')[1].innerHTML ="Rs. "+single;
        document.getElementsByClassName('col-2-right')[2].innerHTML ="Rs. "+double;
        document.getElementsByClassName('col-2-right')[3].innerHTML ="Rs. "+triple;
        document.getElementsByClassName('col-2-right')[4].innerHTML ="Rs. "+custom;
        var tot = single+double+triple+custom;
        document.getElementsByClassName('price')[0].innerHTML ="Rs. " + tot;
        alert("Added to the cart");
    } 
}

////////////////////////////
//FUNCTION FOR PAYMENT DEATILS
function creditcard(a)
{
    a = a*1;
    var card = document.getElementsByClassName('card')[a];
    if(card.name == 0)
    {
        var cname = document.getElementById('cname');
        if(a==0)
        {
            //sbi card
            cname.value="SBI";
        }
        else if(a==1)
        {
            cname.value="Master";
        }
        else if(a==2)
        {
            cname.value="PayPal";
        }
        else if(a==3)
        {
            cname.value="Paytm";
        }
        else if(a==4)
        {
            cname.value="VISA";
        }
        card.style.border = "2px solid red";
        card.name = 1;
    }
    else if(card.name == 1)
    {
        card.style.border = "none";
        document.getElementById('cname').value="SBI";
        card.name = 0;
    }
    for(var i=0;i<5;i++)
    {
        if(i!=a)
        {
            document.getElementsByClassName('card')[i].style.border="none";
        }
    }    
}
function cnames()
{
    var val = document.getElementById('cname');
    if(val.value == "SBI")
    {
        for(var i=0;i<5;i++)
        {
            if(i==0)
            {
                document.getElementsByClassName('card')[i].style.border="2px solid red";
            }
            else
            {
                document.getElementsByClassName('card')[i].style.border="none";
            }
        }
    }
    else if(val.value == "Master")
    {
        for(var i=0;i<5;i++)
        {
            if(i==1)
            {
                document.getElementsByClassName('card')[i].style.border="2px solid red";
            }
            else
            {
                document.getElementsByClassName('card')[i].style.border="none";
            }
        }
    }
    else if(val.value=="PayPal")
    {
        for(var i=0;i<5;i++)
        {
            if(i==2)
            {
                document.getElementsByClassName('card')[i].style.border="2px solid red";
            }
            else
            {
                document.getElementsByClassName('card')[i].style.border="none";
            }
        }
    }
    else if(val.value=="Paytm")
    {
        for(var i=0;i<5;i++)
        {
            if(i==3)
            {
                document.getElementsByClassName('card')[i].style.border="2px solid red";
            }
            else
            {
                document.getElementsByClassName('card')[i].style.border="none";
            }
        }
    }
    else if(val.value=="VISA")
    {
        for(var i=0;i<5;i++)
        {
            if(i==4)
            {
                document.getElementsByClassName('card')[i].style.border="2px solid red";
            }
            else
            {
                document.getElementsByClassName('card')[i].style.border="none";
            }
        }
    }
}