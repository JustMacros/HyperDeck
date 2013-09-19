// -----------------------------------------------------------------------------------------------------------------
// If this project is being updated for Multiple HyperDecks on a single webpage, these global variables need to
// become and array or a list of objects. Many more code changes in JavaScript as also required to ensure the screen
// updates correctly. These changes are just the start.
// -----------------------------------------------------------------------------------------------------------------
GLOBAL_CURRENT_SLOT_NO      = 0;
GLOBAL_SELECTED_CLIP        = 0;
GLOBAL_PLAYING_CLIP         = 0;
GLOBAL_CURRENT_TIMECODE     = '00:00:00:00';
GLOBAL_HYPERDECK_MODE       = '';
GLOBAL_LAST_CHECKED_SCREEN  = 0;

// -----------------------------------------------------------------------------------------------------------------
//  Javascript Function to convert a video mode to a crude Floating point approximation of the number of Frames
//  per second. This is so we can fake the timecode display.
// -----------------------------------------------------------------------------------------------------------------
function VideoModeToFPS( pvVideoMode ) {
                  if ( pvVideoMode == 'PAL' )         { return 25.00;
         } else { if ( pvVideoMode == 'NTSC' )        { return 29.97;
         } else { if ( pvVideoMode == 'NTSC 23.98' )  { return 23.98;
         } else { if ( pvVideoMode == '1080i 50' )    { return 25.00;
         } else { if ( pvVideoMode == '1080i 59.94' ) { return 29.97;
         } else { if ( pvVideoMode == '1080i 60' )    { return 30.00;
         } else { if ( pvVideoMode == '720p 50' )     { return 50.00;
         } else { if ( pvVideoMode == '720p 59.94' )  { return 59.94;            
         } else { if ( pvVideoMode == '720p 60' )     { return 60.00;
         } else { if ( pvVideoMode == '1080p 23.97' ) { return 23.98;
         } else { if ( pvVideoMode == '1080p 24' )    { return 24.00;
         } else { if ( pvVideoMode == '1080p 25' )    { return 25.00;
         } else { if ( pvVideoMode == '1080p 29.97' ) { return 29.97;
         } else { if ( pvVideoMode == '1080p 30' )    { return 30.00;
         } else { if ( pvVideoMode == '1080p 50' )    { return 50.00;
         } else { if ( pvVideoMode == '1080p 59.94' ) { return 59.94;
         } else { if ( pvVideoMode == '1080p 60' )    { return 60.00;
         } } } } } } } } } } } } } } } } }
}

// -----------------------------------------------------------------------------------------------------------------
//  Javascript Function to update the highlight bars on the list of clips based on what is current clip playing
//  per second. This is so we can fake the timecode display.
// -----------------------------------------------------------------------------------------------------------------
function UpdateTableClipListHighlights( pvHyperDeckNumber ) {
              var WkTbl = document.getElementById( 'tblHyperDeck_' + pvHyperDeckNumber + '_ClipList' );
              var lvThisRowIsRec;
              for ( var i = 0, row; row = WkTbl.rows[i]; i++ ) {
                    for ( var j = 0, col; col = row.cells[j]; j++ ) {
                          if ( i > 0 ) {
                               if ( j == 0 ) {
                                    lvThisRowIsRec = Number( col.innerHTML );
                               }
                               if ( lvThisRowIsRec == GLOBAL_PLAYING_CLIP ) {
                                    if ( col.className != 'GreenRowTableHighlight' ) {
                                         col.className  = 'GreenRowTableHighlight';
                                    }
                               } else {
                                    if ( lvThisRowIsRec == GLOBAL_SELECTED_CLIP ) {
                                         if ( col.className != 'BlueRowTableHighlight' ) {
                                              col.className  = 'BlueRowTableHighlight';
                                         }
                                    } else {
                                         if ( col.className != 'NotHighlighted' ) {
                                              col.className  = 'NotHighlighted';
                                         }
                                    }
                               }
                               if ( j == 2 ) {
                               } else {
                               }
                          }
                    }
              }
}

// -----------------------------------------------------------------------------------------------------------------
//  Javascript Function to adjust a timecode in the format 00:00:00:00 by N milliseconds to account for the
//  difference between the timecode being requests to JavaScript by the uypdate timer, and the displaying on the
//  screen. This effectively fakes a faster updating clock than we are really using.
//     * NB: Needs to be up[dated to account for multiple HyperDecks
// -----------------------------------------------------------------------------------------------------------------
function AdjustTimeCode( pvTimeCode, pvAdjustment ) {
         if ( ( GLOBAL_HYPERDECK_MODE == 'playing' ) || ( GLOBAL_HYPERDECK_MODE == 'recording' ) ) {
              var lvData            = pvTimeCode;
              var lvIdx             = lvData.indexOf(':');
              var lvHH              = Number(lvData.substr( 0, lvIdx ));
                  lvData            = lvData.substr( lvIdx + 1 );
                  lvIdx             = lvData.indexOf(':');
              var lvMM              = Number(lvData.substr( 0, lvIdx ));
                  lvData            = lvData.substr( lvIdx + 1 );
                  lvIdx             = lvData.indexOf(':');
              var lvSS              = Number(lvData.substr( 0, lvIdx ));
                  lvFF              = Number(lvData.substr( lvIdx + 1 ));
              var lvFPS             = Number( VideoModeToFPS( document.getElementById('tdVideoMode').innerHTML ) );

              var lvFrames          = ( ( ( lvHH * 3600 ) + ( lvMM * 60 ) + lvSS ) * lvFPS ) + lvFF;
              var lvTotalFrames     = Math.floor( Number(lvFrames) + (( pvAdjustment / 1000 ) * lvFPS ) );
              var lvSeconds         = Math.floor( lvTotalFrames / lvFPS );
                  lvFrames          = lvTotalFrames - Math.floor( lvSeconds * lvFPS );
              var lvHours           = Math.floor( lvSeconds   / 3600 );
                  lvSeconds         = lvSeconds - ( lvHours   * 3600 );
              var lvMinutes         = Math.floor( lvSeconds   /   60 );
                  lvSeconds         = lvSeconds - ( lvMinutes *   60 );
              var lsHH              = '000' + lvHours;   lsHH = lsHH.substr( lsHH.length-2 );
              var lsMM              = '000' + lvMinutes; lsMM = lsMM.substr( lsMM.length-2 );
              var lsSS              = '000' + lvSeconds; lsSS = lsSS.substr( lsSS.length-2 );
              var lsFF              = '000' + lvFrames;  lsFF = lsFF.substr( lsFF.length-2 );
              var lvResult          = lsHH + ':' + lsMM + ':' + lsSS + ':' + lsFF;
              return lvResult;
         } else {
              return pvTimeCode;
         }
}

// -----------------------------------------------------------------------------------------------------------------
//
// -----------------------------------------------------------------------------------------------------------------
function CheckVideoModeCueButton( pvHyperDeckNumber, pvButtonName, pvButtonPostFix ) {
         var  lvTestButton = 'bCue_' + pvHyperDeckNumber + pvButtonPostFix
         if ( pvButtonName == lvTestButton ) {
              SetButtonClass( lvTestButton, 'VISButtonYellow' );
         } else {
              SetButtonClass( lvTestButton, 'VISButton' );
         }
}

// -----------------------------------------------------------------------------------------------------------------
//
// -----------------------------------------------------------------------------------------------------------------
function HighlightVideoModeButton( pvHyperDeckNumber, pvButtonName ) {
         CheckVideoModeCueButton( pvHyperDeckNumber, pvButtonName, '_VM_PAL' );
         CheckVideoModeCueButton( pvHyperDeckNumber, pvButtonName, '_VM_NTSC' );
//         CheckVideoModeCueButton( pvHyperDeckNumber, pvButtonName, '_VM_NTSC23' );

         CheckVideoModeCueButton( pvHyperDeckNumber, pvButtonName, '_VM_720P50' );
         CheckVideoModeCueButton( pvHyperDeckNumber, pvButtonName, '_VM_1080I50' );
         CheckVideoModeCueButton( pvHyperDeckNumber, pvButtonName, '_VM_1080P25' );

         CheckVideoModeCueButton( pvHyperDeckNumber, pvButtonName, '_VM_720P59' );
         CheckVideoModeCueButton( pvHyperDeckNumber, pvButtonName, '_VM_1080I59' );
         CheckVideoModeCueButton( pvHyperDeckNumber, pvButtonName, '_VM_1080P30' );

         CheckVideoModeCueButton( pvHyperDeckNumber, pvButtonName, '_VM_720P60' );
         CheckVideoModeCueButton( pvHyperDeckNumber, pvButtonName, '_VM_1080P23' );
         CheckVideoModeCueButton( pvHyperDeckNumber, pvButtonName, '_VM_1080P24');
         CheckVideoModeCueButton( pvHyperDeckNumber, pvButtonName, '_VM_1080I60');
}

// -----------------------------------------------------------------------------------------------------------------
//
// -----------------------------------------------------------------------------------------------------------------
function SetVideoModeButtonsFor( pvHyperDeckNumber, pvVideoFormat ) {
                  if ( pvVideoFormat == 'PAL' )         { HighlightVideoModeButton( pvHyperDeckNumber, 'bCue_' + pvHyperDeckNumber + '_VM_PAL' );
         } else { if ( pvVideoFormat == 'NTSC' )        { HighlightVideoModeButton( pvHyperDeckNumber, 'bCue_' + pvHyperDeckNumber + '_VM_NTSC' );
         } else { if ( pvVideoFormat == 'NTSC 23.98' )  { HighlightVideoModeButton( pvHyperDeckNumber, 'bCue_' + pvHyperDeckNumber + '_VM_NTSC23' );
         } else { if ( pvVideoFormat == '1080i 50' )    { HighlightVideoModeButton( pvHyperDeckNumber, 'bCue_' + pvHyperDeckNumber + '_VM_1080I50' );
         } else { if ( pvVideoFormat == '1080i 59.94' ) { HighlightVideoModeButton( pvHyperDeckNumber, 'bCue_' + pvHyperDeckNumber + '_VM_1080I59' );
         } else { if ( pvVideoFormat == '1080i 60' )    { HighlightVideoModeButton( pvHyperDeckNumber, 'bCue_' + pvHyperDeckNumber + '_VM_1080I60' );
         } else { if ( pvVideoFormat == '720p 50' )     { HighlightVideoModeButton( pvHyperDeckNumber, 'bCue_' + pvHyperDeckNumber + '_VM_720P50' );
         } else { if ( pvVideoFormat == '720p 59.94' )  { HighlightVideoModeButton( pvHyperDeckNumber, 'bCue_' + pvHyperDeckNumber + '_VM_720P59' );
         } else { if ( pvVideoFormat == '720p 60' )     { HighlightVideoModeButton( pvHyperDeckNumber, 'bCue_' + pvHyperDeckNumber + '_VM_720P60' );
         } else { if ( pvVideoFormat == '1080p 23.97' ) { HighlightVideoModeButton( pvHyperDeckNumber, 'bCue_' + pvHyperDeckNumber + '_VM_1080P23' );
         } else { if ( pvVideoFormat == '1080p 24' )    { HighlightVideoModeButton( pvHyperDeckNumber, 'bCue_' + pvHyperDeckNumber + '_VM_1080P24' );
         } else { if ( pvVideoFormat == '1080p 25' )    { HighlightVideoModeButton( pvHyperDeckNumber, 'bCue_' + pvHyperDeckNumber + '_VM_1080P25' );
         } else { if ( pvVideoFormat == '1080p 29.97' ) { HighlightVideoModeButton( pvHyperDeckNumber, 'bCue_' + pvHyperDeckNumber + '_VM_1080P29' );
         } else { if ( pvVideoFormat == '1080p 30' )    { HighlightVideoModeButton( pvHyperDeckNumber, 'bCue_' + pvHyperDeckNumber + '_VM_1080P30' );
         } else { if ( pvVideoFormat == '1080p 50' )    { HighlightVideoModeButton( pvHyperDeckNumber, 'bCue_' + pvHyperDeckNumber + '_VM_1080P50' );
         } else { if ( pvVideoFormat == '1080p 59.94' ) { HighlightVideoModeButton( pvHyperDeckNumber, 'bCue_' + pvHyperDeckNumber + '_VM_1080P59' );
         } else { if ( pvVideoFormat == '1080p 60' )    { HighlightVideoModeButton( pvHyperDeckNumber, 'bCue_' + pvHyperDeckNumber + '_VM_1080P60' );
         } } } } } } } } } } } } } } } } }
}

// -----------------------------------------------------------------------------------------------------------------
//  JavaScript function - Makes an AJAX call to a Lua Script "102_HYPERDECK_STATUS.html", the Lua Script returns
//  a list of properties in order delimited by "~" characters. This should really be JSON or XML, but because this
//  is such a simple control page, and becuase none-programmers might not understand JSON / XML Parsing tools,
//  it made sense to do it this way. FEEL FREE to improve it
// -----------------------------------------------------------------------------------------------------------------
function GetHyperdeckInfomation( pvHyperDeckNumber ) {
         // Make the AJAX call
         var lvData            = ResponseQry( '102_HYPERDECK_STATUS.html?HYPERDECK=' + pvHyperDeckNumber ) + '~';

         // Go Go Through each data element and put each one in it's own local variable
         // the order in which these are processed MUST match the order in which they are
         // sent by the Lua script called above
         var lvIdx             = lvData.indexOf('~');
         var lvIPAddress       = lvData.substr( 0, lvIdx );
             lvData            = lvData.substr( lvIdx + 1 );

             lvIdx             = lvData.indexOf('~');
         var lvDeviceType      = lvData.substr( 0, lvIdx );
             lvData            = lvData.substr( lvIdx + 1 );

             lvIdx             = lvData.indexOf('~');
         var lvVersionNumber   = lvData.substr( 0, lvIdx );
             lvData            = lvData.substr( lvIdx + 1 );

             lvIdx             = lvData.indexOf('~');
         var lvCurrentSlot     = lvData.substr( 0, lvIdx );
             lvData            = lvData.substr( lvIdx + 1 );

             lvIdx             = lvData.indexOf('~');
         var lvCurrentClip     = lvData.substr( 0, lvIdx );
             lvData            = lvData.substr( lvIdx + 1 );

             lvIdx             = lvData.indexOf('~');
         var lvLoopModeEnabled = lvData.substr( 0, lvIdx );
             if ( lvLoopModeEnabled == 'LOOP-ENABLED' ) { lvLoopModeEnabled = 'ENABLED' } else { lvLoopModeEnabled = 'DISABLED'; }
             lvData            = lvData.substr( lvIdx + 1 );

             lvIdx             = lvData.indexOf('~');
         var lvSingleClipMode  = lvData.substr( 0, lvIdx );
             if ( lvSingleClipMode == 'SINGLE-CLIP-ENABLED' ) { lvSingleClipMode = 'ENABLED' } else { lvSingleClipMode = 'DISABLED'; }
             lvData            = lvData.substr( lvIdx + 1 );

             lvIdx             = lvData.indexOf('~');
         var lvDeckStatus      = lvData.substr( 0, lvIdx );
             lvData            = lvData.substr( lvIdx + 1 );

             lvIdx             = lvData.indexOf('~');
         var lvPlaybackSpeed   = lvData.substr( 0, lvIdx );
             lvData            = lvData.substr( lvIdx + 1 );

             lvIdx             = lvData.indexOf('~');
         var lvTimeCode        = lvData.substr( 0, lvIdx );
             lvData            = lvData.substr( lvIdx + 1 );

             lvIdx             = lvData.indexOf('~');
         var lvVideoFormat     = lvData.substr( 0, lvIdx );
             lvData            = lvData.substr( lvIdx + 1 );

             lvIdx             = lvData.indexOf('~');
         var lvSlot1VolumeName = lvData.substr( 0, lvIdx );
             lvData            = lvData.substr( lvIdx + 1 );

             lvIdx             = lvData.indexOf('~');
         var lvSlot1Space      = lvData.substr( 0, lvIdx );
             lvData            = lvData.substr( lvIdx + 1 );

             lvIdx             = lvData.indexOf('~');
         var lvSlot1Status     = lvData.substr( 0, lvIdx );
             lvData            = lvData.substr( lvIdx + 1 );

             lvIdx             = lvData.indexOf('~');
         var lvSlot2VolumeName = lvData.substr( 0, lvIdx );
             lvData            = lvData.substr( lvIdx + 1 );

             lvIdx             = lvData.indexOf('~');
         var lvSlot2Space      = lvData.substr( 0, lvIdx );
             lvData            = lvData.substr( lvIdx + 1 );

             lvIdx             = lvData.indexOf('~');
         var lvSlot2Status     = lvData.substr( 0, lvIdx );
             lvData            = lvData.substr( lvIdx + 1 );

             lvIdx             = lvData.indexOf('~');
         var lvVideoConnection = lvData.substr( 0, lvIdx );
             lvData            = lvData.substr( lvIdx + 1 );

             lvIdx             = lvData.indexOf('~');
         var lvAudioConnection = lvData.substr( 0, lvIdx );
             lvData            = lvData.substr( lvIdx + 1 );

             lvIdx             = lvData.indexOf('~');
         var lvFileFormat      = lvData.substr( 0, lvIdx );
             lvData            = lvData.substr( lvIdx + 1 );

// -----------------------------------------------------------------------------------
//  Section used for testing, you MUST NOT attempt to use the console when using the
//  browser built into JustMacros.
// -----------------------------------------------------------------------------------
//         console.log( '         IP Address: ' + lvIPAddress );
//         console.log( '        Device Type: ' + lvDeviceType );
//         console.log( '     Version Number: ' + lvVersionNumber );
//         console.log( '    Current Slot No: ' + lvCurrentSlot );
//         console.log( '    Current Clip No: ' + lvCurrentClip );
//         console.log( '  Loop Mode Enabled: ' + lvLoopModeEnabled );
//         console.log( 'Single Clip Enabled: ' + lvSingleClipMode );
//         console.log( '        Deck Status: ' + lvDeckStatus );
//         console.log( '     Playback Speed: ' + lvPlaybackSpeed );
//         console.log( ' Slot 1 Volume Name: ' + lvSlot1VolumeName );
//         console.log( '    Space Available: ' + lvSlot1Space );
//         console.log( '             Status: ' + lvSlot1Status );
//         console.log( ' Slot 2 Volume Name: ' + lvSlot2VolumeName );
//         console.log( '    Space Available: ' + lvSlot2Space );
//         console.log( '             Status: ' + lvSlot2Status );
//         console.log( '   Video Connection: ' + lvVideoConnection );
//         console.log( '   Audio Connection: ' + lvAudioConnection );
//         console.log( '         FileFormat: ' + lvFileFormat );

         // ----------------------------------------------------------
         // Next Update the Table on the Left hand side of the screen
         //   NB: This is another area where multiple Hyperdecks
         //       requires update, this table does not include
         //       the HyperDeck Number in the document element IDs
         //       and hence without modifiying the
         //                HYPERDECK_DRAWING_TOOLS
         //       which is where these object are drawn, you cannot
         //       update multiple HyperDecks panels safely
         // ----------------------------------------------------------
         var WkTD;
         WkTD = document.getElementById('tdIPAddress');      if ( WkTD.innerHTML != lvIPAddress       ) { WkTD.innerHTML  = lvIPAddress;       }
         WkTD = document.getElementById('tdDeviceType');     if ( WkTD.innerHTML != lvDeviceType      ) { WkTD.innerHTML  = lvDeviceType;      }
         WkTD = document.getElementById('tdVersionNumber');  if ( WkTD.innerHTML != lvVersionNumber   ) { WkTD.innerHTML  = lvVersionNumber;   }
         WkTD = document.getElementById('tdCurrentSlotNo');  if ( WkTD.innerHTML != lvCurrentSlot     ) { WkTD.innerHTML  = lvCurrentSlot;     }
         WkTD = document.getElementById('tdCurrentClipNo');  if ( WkTD.innerHTML != lvCurrentClip     ) { WkTD.innerHTML  = lvCurrentClip;     }
         WkTD = document.getElementById('tdLoopMode');       if ( WkTD.innerHTML != lvLoopModeEnabled ) { WkTD.innerHTML  = lvLoopModeEnabled; }
         WkTD = document.getElementById('tdSingleClipMode'); if ( WkTD.innerHTML != lvSingleClipMode  ) { WkTD.innerHTML  = lvSingleClipMode;  }
         WkTD = document.getElementById('tdPlaybackSpeed');  if ( WkTD.innerHTML != lvPlaybackSpeed   ) { WkTD.innerHTML  = lvPlaybackSpeed;   }
         WkTD = document.getElementById('tdVideoMode');      if ( WkTD.innerHTML != lvVideoFormat     ) { WkTD.innerHTML  = lvVideoFormat;   }
         WkTD = document.getElementById('tdSlot1VolName');   if ( WkTD.innerHTML != lvSlot1VolumeName ) { WkTD.innerHTML  = lvSlot1VolumeName; }
         WkTD = document.getElementById('tdSlot1Space');     if ( WkTD.innerHTML != lvSlot1Space      ) { WkTD.innerHTML  = lvSlot1Space;      }
         WkTD = document.getElementById('tdSlot1Status');    if ( WkTD.innerHTML != lvSlot1Status     ) { WkTD.innerHTML  = lvSlot1Status;     }
         WkTD = document.getElementById('tdSlot2VolName');   if ( WkTD.innerHTML != lvSlot2VolumeName ) { WkTD.innerHTML  = lvSlot2VolumeName; }
         WkTD = document.getElementById('tdSlot2Space');     if ( WkTD.innerHTML != lvSlot2Space      ) { WkTD.innerHTML  = lvSlot2Space;      }
         WkTD = document.getElementById('tdSlot2Status');    if ( WkTD.innerHTML != lvSlot2Status     ) { WkTD.innerHTML  = lvSlot2Status;     }

         // Update the timecode clock
         var WkEdit = document.getElementById('eRecClockTC' + pvHyperDeckNumber ); if ( WkEdit.value != lvTimeCode ) { WkEdit.value = lvTimeCode; }

         // Set the Single Clip and Loop Mode Button States
         if ( lvLoopModeEnabled == 'ENABLED' ) {
              SetButtonClass( 'bLoop_'       + pvHyperDeckNumber, 'VISButtonYellow' );
         } else {
              SetButtonClass( 'bLoop_'       + pvHyperDeckNumber, 'VISButton' );
         }
         if ( lvSingleClipMode == 'ENABLED' ) {
              SetButtonClass( 'bSingleClip_' + pvHyperDeckNumber, 'VISButtonYellow' );
         } else {
              SetButtonClass( 'bSingleClip_' + pvHyperDeckNumber, 'VISButton' );
         }

         // Update the global varaibles - Note needs modification for Multiple HyperDecks.
         GLOBAL_LAST_CHECKED_SCREEN = Date.now();
         GLOBAL_CURRENT_TIMECODE    = lvTimeCode;
         GLOBAL_HYPERDECK_MODE      = lvDeckStatus;

         SetVideoModeButtonsFor( pvHyperDeckNumber, lvVideoFormat );

         // Now Update the screen based on what mode we are in
         if ( lvDeckStatus == 'playing' ) {
              // If we are playing, hide the Play button to reveal the Pause button positioned underneath
              document.getElementById('bNAV_' + pvHyperDeckNumber + '_PLAY').style.display = 'none';
              // and ensure the Eject Button is enabled for use
              SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_EJECT', 'VISButton', GLOBAL_IMG_EJECT );
              SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_FORWARD', 'VISButton', GLOBAL_IMG_FORWARD );
              SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_REWIND', 'VISButton', GLOBAL_IMG_REWIND );
         } else {
         if ( lvDeckStatus == 'forward' ) {
              document.getElementById('bNAV_' + pvHyperDeckNumber + '_PLAY').style.display = 'none';
              if ( Number( lvPlaybackSpeed ) > 100 ) {
                   SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_FORWARD', 'VISButtonRed',  GLOBAL_IMG_FORWARD );
              } else {
                   SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_FORWARD', 'VISButtonBlue', GLOBAL_IMG_FORWARD );
              }
         } else {
         if ( lvDeckStatus == 'rewind' ) {
              document.getElementById('bNAV_' + pvHyperDeckNumber + '_PLAY').style.display = 'none';
              SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_REWIND', 'VISButtonBlue', GLOBAL_IMG_REWIND );
              if ( Number( lvPlaybackSpeed ) < (-100) ) {
                   SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_REWIND', 'VISButtonRed',  GLOBAL_IMG_REWIND );
              } else {
                   SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_REWIND', 'VISButtonBlue', GLOBAL_IMG_REWIND );
              }
         } else {
              // If we are not playing, make sure the Play Button is visible
              document.getElementById('bNAV_' + pvHyperDeckNumber + '_PLAY').style.display = 'block';
              if ( lvDeckStatus == 'still' ) {
                   // If we are in PLAY mode but STILL, then we still need the EJECT button enabled
                   SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_EJECT', 'VISButton', GLOBAL_IMG_EJECT );
              } else {
                   // Otherwise we must be recording or in E2E mode so we can DISABLE the EJECT Button
                   SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_EJECT', 'VISButtonDisabled', GLOBAL_IMG_DISABLED_EJECT );
              }

              // Since here we know we are not playing, we are either recording or E2E or Playing but STILL
              if ( lvDeckStatus == 'recording' ) {
                   // If we are recording, we need to hide the RECORD button and hence reveal the STOP button below
                   document.getElementById('bNAV_' + pvHyperDeckNumber + '_RECORD').style.display = 'none';
                   // also we change the STOP button class to indicate it's recording
                   SetButtonClass('bNAV_' + pvHyperDeckNumber + '_STOP', 'VISButtonRed' );
                   // Now disable all the Media Playback controls - we can't playback whilst recording
                   SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_FIRST',   'VISButtonDisabled', GLOBAL_IMG_DISABLED_FIRST );
                   SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_REWIND',  'VISButtonDisabled', GLOBAL_IMG_DISABLED_REWIND );
                   SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_PLAY',    'VISButtonDisabled', GLOBAL_IMG_DISABLED_PLAY );
                   SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_PAUSE',   'VISButtonDisabled', GLOBAL_IMG_DISABLED_PAUSE );
                   SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_FORWARD', 'VISButtonDisabled', GLOBAL_IMG_DISABLED_FORWARD );
                   SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_LAST',    'VISButtonDisabled', GLOBAL_IMG_DISABLED_LAST );
              } else {
                   // Otherwise we do the opposite, make sure RECORD is visisble
                   document.getElementById('bNAV_' + pvHyperDeckNumber + '_RECORD').style.display = 'block';
                   SetButtonClass('bNAV_' + pvHyperDeckNumber + '_STOP', 'VISButton' );
                   // and enable the Playback Controls.
                   SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_FIRST',   'VISButton', GLOBAL_IMG_FIRST );
                   SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_REWIND',  'VISButton', GLOBAL_IMG_REWIND );
                   SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_PLAY',    'VISButton', GLOBAL_IMG_PLAY );
                   SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_PAUSE',   'VISButton', GLOBAL_IMG_PAUSE );
                   SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_FORWARD', 'VISButton', GLOBAL_IMG_FORWARD );
                   SetButtonClassAndImage('bNAV_' + pvHyperDeckNumber + '_LAST',    'VISButton', GLOBAL_IMG_LAST );
              }
         } } }

         // ----------------------------------------------------------------------
         // These two structured If Statements set the button colours of the SLOT
         // buttons depending on the Slot Status
         // ----------------------------------------------------------------------
         if ( lvSlot1Status == 'EMPTY' ) {
              SetButtonClass( 'bSlot_' + pvHyperDeckNumber + '_1', 'VISButtonDisabled' );
         } else {
              if ( lvSlot1Status == 'MOUNTED' ) {
                   if ( lvCurrentSlot == 1 ) {
                        SetButtonClass( 'bSlot_' + pvHyperDeckNumber + '_1', 'VISButtonYellow' );
                   } else {
                        SetButtonClass( 'bSlot_' + pvHyperDeckNumber + '_1', 'VISButton' );
                   }
              } else {
                   if ( lvSlot1Status != 'MOUNTING' ) {
                        SetButtonClass( 'bSlot_' + pvHyperDeckNumber + '_1', 'VISButtonRed' );
                   } else {
                        SetButtonClass( 'bSlot_' + pvHyperDeckNumber + '_1', 'VISButtonDisabled' );
                   }
              }
         }
         if ( lvSlot2Status == 'EMPTY' ) {
              SetButtonClass( 'bSlot_' + pvHyperDeckNumber + '_2', 'VISButtonDisabled' );
         } else {
              if ( lvSlot2Status == 'MOUNTED' ) {
                   if ( lvCurrentSlot == 2 ) {
                        SetButtonClass( 'bSlot_' + pvHyperDeckNumber + '_2', 'VISButtonYellow' );
                   } else {
                        SetButtonClass( 'bSlot_' + pvHyperDeckNumber + '_2', 'VISButton' );
                   }
              } else {
                   if ( lvSlot2Status != 'MOUNTING' ) {
                        SetButtonClass( 'bSlot_' + pvHyperDeckNumber + '_2', 'VISButtonRed' );
                   } else {
                        SetButtonClass( 'bSlot_' + pvHyperDeckNumber + '_2', 'VISButtonDisabled' );
                   }
              }
         }


         if ( GLOBAL_CURRENT_SLOT_NO != lvCurrentSlot ) {
//              Clip Number has changed, update the screen
              GLOBAL_CURRENT_SLOT_NO = lvCurrentSlot;
              setTimeout( "PopulatePanelWithClipList(" + pvHyperDeckNumber + ", 'pnlClipListCointainer_" + pvHyperDeckNumber + "');", 500 );
         }

         if ( GLOBAL_PLAYING_CLIP != lvCurrentClip ) {
//              Clip Number has changed, update the screen
              GLOBAL_PLAYING_CLIP = lvCurrentClip;
              UpdateTableClipListHighlights( pvHyperDeckNumber );
         }

         // Video Input Connection
         if ( lvVideoConnection == 'SDI' ) {
              SetButtonClass( 'bSDI_'       + pvHyperDeckNumber, 'VISButtonYellow' );
              SetButtonClass( 'bHDMI_'      + pvHyperDeckNumber, 'VISButton' );
              SetButtonClass( 'bComponent_' + pvHyperDeckNumber, 'VISButton' );
         } else {
              if ( lvVideoConnection == 'HDMI' ) {
                   SetButtonClass( 'bSDI_'       + pvHyperDeckNumber, 'VISButton' );
                   SetButtonClass( 'bHDMI_'      + pvHyperDeckNumber, 'VISButtonYellow' );
                   SetButtonClass( 'bComponent_' + pvHyperDeckNumber, 'VISButton' );
              } else {
                   if ( lvVideoConnection == 'component' ) {
                        SetButtonClass( 'bSDI_'       + pvHyperDeckNumber, 'VISButton' );
                        SetButtonClass( 'bHDMI_'      + pvHyperDeckNumber, 'VISButton' );
                        SetButtonClass( 'bComponent_' + pvHyperDeckNumber, 'VISButtonYellow' );
                   } else {
                        SetButtonClass( 'bSDI_'       + pvHyperDeckNumber, 'VISButton' );
                        SetButtonClass( 'bHDMI_'      + pvHyperDeckNumber, 'VISButton' );
                        SetButtonClass( 'bComponent_' + pvHyperDeckNumber, 'VISButton' );
                   }
              }
         }

         if ( lvAudioConnection == 'embedded' ) {
              SetButtonClass( 'bEmbedded_' + pvHyperDeckNumber, 'VISButtonYellow' );
              SetButtonClass( 'bXLR_'      + pvHyperDeckNumber, 'VISButton' );
              SetButtonClass( 'bRCA_'      + pvHyperDeckNumber, 'VISButton' );
         } else {
              if ( lvVideoConnection == 'XLR' ) {
                   SetButtonClass( 'bEmbedded_' + pvHyperDeckNumber, 'VISButton' );
                   SetButtonClass( 'bXLR_'      + pvHyperDeckNumber, 'VISButtonYellow' );
                   SetButtonClass( 'bRCA_'      + pvHyperDeckNumber, 'VISButton' );
              } else {
                   if ( lvVideoConnection == 'RCA' ) {
                        SetButtonClass( 'bEmbedded_' + pvHyperDeckNumber, 'VISButton' );
                        SetButtonClass( 'bXLR_'      + pvHyperDeckNumber, 'VISButton' );
                        SetButtonClass( 'bRCA_'      + pvHyperDeckNumber, 'VISButtonYellow' );
                   } else {
                        SetButtonClass( 'bEmbedded_' + pvHyperDeckNumber, 'VISButton' );
                        SetButtonClass( 'bXLR_'      + pvHyperDeckNumber, 'VISButton' );
                        SetButtonClass( 'bRCA_'      + pvHyperDeckNumber, 'VISButton' );
                   }
              }
         }

         if ( lvFileFormat == 'QuickTimeUncompressed' ) {
              SetButtonClass( 'bUncompressed_'   + pvHyperDeckNumber, 'VISButtonYellow' );
              SetButtonClass( 'bQuickTimeDNXHD_' + pvHyperDeckNumber, 'VISButton' );
              SetButtonClass( 'bDNxHD_'          + pvHyperDeckNumber, 'VISButton' );
              SetButtonClass( 'bProResHQ_'       + pvHyperDeckNumber, 'VISButton' );
              SetButtonClass( 'bProRes422_'      + pvHyperDeckNumber, 'VISButton' );
              SetButtonClass( 'bProResLT_'       + pvHyperDeckNumber, 'VISButton' );
              SetButtonClass( 'bProResProxy_'    + pvHyperDeckNumber, 'VISButton' );
         } else {
              if ( lvFileFormat == 'QuickTimeDNxHD220' ) {
                   SetButtonClass( 'bUncompressed_'   + pvHyperDeckNumber, 'VISButton' );
                   SetButtonClass( 'bQuickTimeDNXHD_' + pvHyperDeckNumber, 'VISButtonYellow' );
                   SetButtonClass( 'bDNxHD_'          + pvHyperDeckNumber, 'VISButton' );
                   SetButtonClass( 'bProResHQ_'       + pvHyperDeckNumber, 'VISButton' );
                   SetButtonClass( 'bProRes422_'      + pvHyperDeckNumber, 'VISButton' );
                   SetButtonClass( 'bProResLT_'       + pvHyperDeckNumber, 'VISButton' );
                   SetButtonClass( 'bProResProxy_'    + pvHyperDeckNumber, 'VISButton' );
              } else {
                   if ( lvFileFormat == 'DNxHD220' ) {
                        SetButtonClass( 'bUncompressed_'   + pvHyperDeckNumber, 'VISButton' );
                        SetButtonClass( 'bQuickTimeDNXHD_' + pvHyperDeckNumber, 'VISButton' );
                        SetButtonClass( 'bDNxHD_'          + pvHyperDeckNumber, 'VISButtonYellow' );
                        SetButtonClass( 'bProResHQ_'       + pvHyperDeckNumber, 'VISButton' );
                        SetButtonClass( 'bProRes422_'      + pvHyperDeckNumber, 'VISButton' );
                        SetButtonClass( 'bProResLT_'       + pvHyperDeckNumber, 'VISButton' );
                        SetButtonClass( 'bProResProxy_'    + pvHyperDeckNumber, 'VISButton' );
                   } else {
                        if ( lvFileFormat == 'QuickTimeProResHQ' ) {
                             SetButtonClass( 'bUncompressed_'   + pvHyperDeckNumber, 'VISButton' );
                             SetButtonClass( 'bQuickTimeDNXHD_' + pvHyperDeckNumber, 'VISButton' );
                             SetButtonClass( 'bDNxHD_'          + pvHyperDeckNumber, 'VISButton' );
                             SetButtonClass( 'bProResHQ_'       + pvHyperDeckNumber, 'VISButtonYellow' );
                             SetButtonClass( 'bProRes422_'      + pvHyperDeckNumber, 'VISButton' );
                             SetButtonClass( 'bProResLT_'       + pvHyperDeckNumber, 'VISButton' );
                             SetButtonClass( 'bProResProxy_'    + pvHyperDeckNumber, 'VISButton' );
                        } else {
                             if ( lvFileFormat == 'QuickTimeProRes422' ) {
                                  SetButtonClass( 'bUncompressed_'   + pvHyperDeckNumber, 'VISButton' );
                                  SetButtonClass( 'bQuickTimeDNXHD_' + pvHyperDeckNumber, 'VISButton' );
                                  SetButtonClass( 'bDNxHD_'          + pvHyperDeckNumber, 'VISButton' );
                                  SetButtonClass( 'bProResHQ_'       + pvHyperDeckNumber, 'VISButton' );
                                  SetButtonClass( 'bProRes422_'      + pvHyperDeckNumber, 'VISButtonYellow' );
                                  SetButtonClass( 'bProResLT_'       + pvHyperDeckNumber, 'VISButton' );
                                  SetButtonClass( 'bProResProxy_'    + pvHyperDeckNumber, 'VISButton' );
                             } else {
                                  if ( lvFileFormat == 'QuickTimeProResLT' ) {
                                       SetButtonClass( 'bUncompressed_'   + pvHyperDeckNumber, 'VISButton' );
                                       SetButtonClass( 'bQuickTimeDNXHD_' + pvHyperDeckNumber, 'VISButton' );
                                       SetButtonClass( 'bDNxHD_'          + pvHyperDeckNumber, 'VISButton' );
                                       SetButtonClass( 'bProResHQ_'       + pvHyperDeckNumber, 'VISButton' );
                                       SetButtonClass( 'bProRes422_'      + pvHyperDeckNumber, 'VISButton' );
                                       SetButtonClass( 'bProResLT_'       + pvHyperDeckNumber, 'VISButtonYellow' );
                                       SetButtonClass( 'bProResProxy_'    + pvHyperDeckNumber, 'VISButton' );
                                  } else {
                                       if ( lvFileFormat == 'QuickTimeProResProxy' ) {
                                            SetButtonClass( 'bUncompressed_'   + pvHyperDeckNumber, 'VISButton' );
                                            SetButtonClass( 'bQuickTimeDNXHD_' + pvHyperDeckNumber, 'VISButton' );
                                            SetButtonClass( 'bDNxHD_'          + pvHyperDeckNumber, 'VISButton' );
                                            SetButtonClass( 'bProResHQ_'       + pvHyperDeckNumber, 'VISButton' );
                                            SetButtonClass( 'bProRes422_'      + pvHyperDeckNumber, 'VISButton' );
                                            SetButtonClass( 'bProResLT_'       + pvHyperDeckNumber, 'VISButton' );
                                            SetButtonClass( 'bProResProxy_'    + pvHyperDeckNumber, 'VISButtonYellow' );
                                       } else {
                                            SetButtonClass( 'bUncompressed_'   + pvHyperDeckNumber, 'VISButton' );
                                            SetButtonClass( 'bQuickTimeDNXHD_' + pvHyperDeckNumber, 'VISButton' );
                                            SetButtonClass( 'bDNxHD_'          + pvHyperDeckNumber, 'VISButton' );
                                            SetButtonClass( 'bProResHQ_'       + pvHyperDeckNumber, 'VISButton' );
                                            SetButtonClass( 'bProRes422_'      + pvHyperDeckNumber, 'VISButton' );
                                            SetButtonClass( 'bProResLT_'       + pvHyperDeckNumber, 'VISButton' );
                                            SetButtonClass( 'bProResProxy_'    + pvHyperDeckNumber, 'VISButton' );
                                       }
                                  }
                             }
                        }
                   }
              }
         }
}


// --------------------------------------------------------------------------------------------------------------------------
//  This function calls other functions that query the status of the HyperDeck and
// --------------------------------------------------------------------------------------------------------------------------
function UpdateTheScreen() {
         try {
               var lvTickCount = Date.now();
               if ( ( lvTickCount - GLOBAL_LAST_CHECKED_SCREEN ) > 2000 ) {
                      GetHyperdeckInfomation( 1 );
               } else {
                      var lvCurrentTimeCode = AdjustTimeCode( GLOBAL_CURRENT_TIMECODE, lvTickCount - GLOBAL_LAST_CHECKED_SCREEN );
//                      console.log( lvCurrentTimeCode );
                      var WkEdit = document.getElementById('eRecClockTC1' ); if ( WkEdit.value != lvCurrentTimeCode ) { WkEdit.value = lvCurrentTimeCode; }
               }
         } catch(e) {
           // Do nothing
         }                                                          
         setTimeout( "UpdateTheScreen();", 100 );
}

// --------------------------------------------------------------------------------------------------------------------------
//  Initial function called when the screen is first displayed
// --------------------------------------------------------------------------------------------------------------------------
function StartUpdateTimers() {
         UpdateTheScreen();
}

function PopulatePanelWithClipList( pvHyperDeckNumber, pvPanelID ) {
         var WkDIV = document.getElementById( pvPanelID ).innerHTML = ResponseQry( '103_HYPERDECK_CLIPS_LIST.html?HYPERDECK=' + pvHyperDeckNumber );
}


