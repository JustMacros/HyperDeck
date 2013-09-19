function SetButtonClass( pvButtonID, pvClass ) {
         var WkDIV = document.getElementById( pvButtonID );
         if ( WkDIV != null ) {
              if ( WkDIV.className         != pvClass ) {
                   WkDIV.className          = pvClass;
              }
              WkDIV    = document.getElementById( pvButtonID + '_Inner' );
              if ( WkDIV.className         != pvClass + 'Inner' ) {
                   WkDIV.className          = pvClass + 'Inner';
              }
         }
}

function SetButtonClassAndImage( pvButtonID, pvClass, pvImgSource ) {
         var WkDIV = document.getElementById( pvButtonID );
         if ( WkDIV != null ) {
              if ( WkDIV.className         != pvClass ) {
                   WkDIV.className          = pvClass;
              }
              WkDIV    = document.getElementById( pvButtonID + '_Inner' );
              if ( WkDIV.className         != pvClass + 'Inner' ) {
                   WkDIV.className          = pvClass + 'Inner';
              }
         }
         var WkIMG = document.getElementById( pvButtonID + '_ImageImg' );
         if ( WkIMG != null ) {
              if ( WkIMG.src != pvImgSource ) {
                   WkIMG.src = pvImgSource;
              }
         }

}



function SetButtonVisible( pvButtonID, pvVisible ) {
         var WkDIV = document.getElementById( pvButtonID );
         if ( pvVisible == true ) {
              if ( WkDIV.style.display      != 'block' ) {
                   WkDIV.style.display       = 'block';
              }
         } else {
              if ( WkDIV.style.display      != 'none' ) {
                   WkDIV.style.display       = 'none';
              }
         }
}

function SetPanelColor( pvPanelID, pvColour ) {
         var WkDIV = document.getElementById( pvPanelID );
         if ( WkDIV.style.backgroundColor      != pvColour ) {
              WkDIV.style.backgroundColor       = pvColour;
         }
}

function SetPanelSize( pvPanelID, pvHeight, pvWidth ) {
         var WkDIV = document.getElementById( pvPanelID );
         if ( WkDIV.style.height      != pvHeight + 'px' ) {
              WkDIV.style.height       = pvHeight + 'px';
         }
         if ( WkDIV.style.width       != pvWidth + 'px' ) {
              WkDIV.style.width        = pvWidth + 'px';
         }
}                                          
