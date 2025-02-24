export default function cartButtonHandler(id,action,setCartCounter) {
    setCartCounter(
        (prev) => {
                    const cartArray = [...prev];
                    const start = cartArray.length && true;
                    if(!start) {
                        //if emppty
                        const quantity = 1;
                        return [{ID: id, quantity}] 
                    } else {
                        //if not empty check if present
                        let interest;
                        let juncture = false;
                        for(const item of cartArray){
                            let question = item.ID == id;
                            if (question) {juncture = true; interest = cartArray.indexOf(item); break}
                        }

                        if(juncture) {
                            //present, add on add; remove on subtract, if 0 delete from cart array
                            const itemOfInterest = cartArray[interest] 
                            switch(action) {
                                case 'add':
                                    return cartArray.map((item, i) =>
                                        i === interest ? { ...item, quantity: item.quantity + 1 } : item
                                    );
                                case 'subtract':
                                    const checkQuantity = cartArray[interest].quantity - 1
                                    if(checkQuantity < 1) {
                                        return cartArray.filter((item) => item !== itemOfInterest)
                                    }
                                    return cartArray.map((item, i) =>
                                        i === interest ? { ...item, quantity: item.quantity - 1 } : item
                                    );
                            }
                        } else {
                            //not present, do nothing on subtract add 1 on add
                            switch(action) {
                                case 'add':
                                    const quantity = 1;
                                    return [{ID: id, quantity},...prev]
                                case 'subtract':
                                    return prev;
                            }
                            }   
                    }    
        } 
    )
}