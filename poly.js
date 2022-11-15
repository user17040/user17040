function factorize(a,n){
    var a=Math.abs(a)
    var list=[]
    for(var i=1;i*i<=a;i++){
        if(a%i==0){
            list.push(i)
            if(n){
                list.push(-i)   
            }
            if(i*i!=a){
                list.push(a/i)
                if(n){
                    list.push(-a/i)   
                }
            }
        }
    }
    return list
}
function chance(a,b){
    var arr=[]
    var fa=factorize(a,true)
    var fb=factorize(b,false)
    for(var i=0;i<fa.length;i++){
        for(var j=0;j<fb.length;j++){
            arr.push(new Polynomial([fa[i],fb[j]]))
        }
    }
    return arr
}
function gcd(a,b){
    return b==0?a:gcd(b,a%b)
}
function factorsearch(a,fac=[]){
    var arr=chance(a.coeff['0'],a.coeff[a.degree().toString()])
    for(var i=0;i<arr.length;i++){
        if(a.mod(arr[i])==0){
            fac.push(arr[i])
            a=a.div(arr[i])
            if(a.degree()>0){
                return factorsearch(a,fac)
            }
        }
    }
    if(a==1){
        return fac
    }
    return fac.concat(a)
}
factor=function(a){
    var fac=[]
    var G=0
    for(var i=0;i<=a.degree();i++){
        var t=a.coeff[i.toString()]
        if(t!=undefined){
            G=gcd(Math.abs(t),G)
        }
    }
    if(a.coeff[a.degree().toString()]>0){
        a=a.div(new Polynomial([G]))
        fac.push(G)    
    }
    else{
        a=a.div(new Polynomial([-G]))
        fac.push(-G)
    }
    while(a.coeff['0']==undefined){
        a=a.div(new Polynomial([0,1]))
        fac.push(new Polynomial([0,1]))
    }
    fac=fac.concat(factorsearch(a))
    return fac
}
function frac(a,b){
    var g=gcd(a,b)
    if(b/g==1){
      return a/g
    }
    if(b/g<0){
      return '-\\frac{'+a/g+"}{"+(-b/g)+'}'
    }
    if(a/g<0){
      return '-\\frac{'+(-a/g)+"}{"+b/g+'}'
    }
    return '\\frac{'+a/g+"}{"+b/g+'}'
}
sqrt=function(a){
    var k=1
    var i=2
    while(i**2<=a){
      if(a%i**2==0){
        k*=i
        a/=i**2
      }
      else{
        i++
      }
    }
    return [k,a]
  }
degree1=function(a,b){
    var X1=frac(-b,a)
    return [X1]
}
degree2=function(a,b,c){
    var delta=b**2-4*a*c
    var sqrtf=sqrt(Math.abs(delta))
    if(delta>0){
        if(sqrtf[0]/(2*Math.abs(a))==1){
            var x1=frac(-b,2*a)+'+\\sqrt{'+sqrtf[1]+'}'
            var x2=frac(-b,2*a)+'-\\sqrt{'+sqrtf[1]+'}'  
        }
        else{
            var x1=frac(-b,2*a)+'+'+frac(sqrtf[0],2*Math.abs(a))+'*\\sqrt{'+sqrtf[1]+'}'
            var x2=frac(-b,2*a)+'-'+frac(sqrtf[0],2*Math.abs(a))+'*\\sqrt{'+sqrtf[1]+'}'
        }
    }
    else{
        if(sqrtf[0]/(2*Math.abs(a))==1){
            var x1=frac(-b,2*a)+'+\\sqrt{'+sqrtf[1]+'}*i'
            var x2=frac(-b,2*a)+'-\\sqrt{'+sqrtf[1]+'}*i'  
        }
        else{
            var x1=frac(-b,2*a)+'+'+frac(sqrtf[0],2*Math.abs(a))+'*\\sqrt{'+sqrtf[1]+'}*i'
            var x2=frac(-b,2*a)+'-'+frac(sqrtf[0],2*Math.abs(a))+'*\\sqrt{'+sqrtf[1]+'}*i'
        }    
    }
    return [delta,x1,x2]
}