/*------------------------------------------------------------------------------
Function:       eCSStender.font-face.js
Author:         Aaron Gustafson (aaron at easy-designs dot net)
Creation Date:  2009-10-09
Version:        0.1
Homepage:       http://github.com/easy-designs/eCSStender.font-face.js
License:        MIT License 
Note:           If you change or improve on this script, please let us know by
                emailing the author (above) with a link to your demo page.
------------------------------------------------------------------------------*/
(function(){
  
  var
  
  // keywords
  FALSE = false,
  TRUE  = true,
  NULL  = null,
  UNDEFINED,
  
  // aliases
  e;
  
  if ( typeof eCSStender == UNDEFINED ){ return; }
  e = eCSStender;
  
  e.onComplete(function(){
    var 
    
    // supported formats
    formats = {
      eot: FALSE,
      ttf: 'truetype',
      otf: 'opentype',
      svg: 'svg'
    },
    format,
    svg_id = e.methods.svg_id || FALSE,
    
    // font parsing vars
    fonts  = e.fonts,
    count  = fonts.length,
    i, font, src, url,
    
    // styles
    contents, props,
    styles         = '',
    font_pattern   = '@font-face { % } ',
    url_pattern    = "url('%')",
    format_pattern = "format('%')",
    
    // XMLHttpRequest
    __xhr  = NULL;
        
    // go through the fonts in the system
    for ( i=0; i<count; i++ )
    {
      contents = '';
      font     = fonts[i];
      src      = font.src.replace( /url\(\s*['"]?([^'"\s)]*)['"]?\s*\)/, '$1' );
      // add the local block
      font.src = [ "local('" + font['font-family'] + "')" ];
      // now test each version
      for ( format in formats )
      {
        if ( e.isInheritedProperty( formats, format ) ){ continue; }
        file = src + '.' + format;
        if ( fileExists( file ) )
        {
          if ( format == 'eot' )
          {
            contents += 'src: ' + url_pattern.replace( '%', file ) + '; ';
          }
          else
          {
            if ( format == 'svg' &&
                 svg_id != '' )
            {
              file += '#' + svg_id;
            }
            font.src.push( url_pattern.replace( '%', file ) +
                           ( formats[format] != FALSE ? ' ' + format_pattern.replace( '%', formats[format] )
                                                      : '' ) );
          }
        }
      }
      font.src = font.src.join(', ');
      // write in the properties
      for ( prop in font )
      {
        if ( e.isInheritedProperty( font, prop ) ){ continue; }
        contents += prop + ': ' + font[prop] + '; ';
      }
      styles += font_pattern.replace( '%', contents );
    }
    e.embedCSS( styles );
    
    // utils
    function fileExists( uri )
    {
      if ( uri == NULL ){ return FALSE; }
      if ( __xhr == NULL ){ __xhr = new XHR(); }
      __xhr.open( 'GET', uri, FALSE );
      __xhr.send( NULL );
      var status = NULL;
      do {
        if ( __xhr.readyState == 4 ) { status = __xhr.status; }
      } while ( status == NULL )
      return status == 200 ? TRUE : FALSE;
    }
    function XHR()
    {
      var connection;
      try { connection = new XMLHttpRequest(); }
      catch( e ){
        try { connection = new ActiveXObject('Msxml2.XMLHTTP'); }
        catch( e ){
          try { connection = new ActiveXObject('Microsoft.XMLHTTP'); }
          catch( e ){
            connection = FALSE;
          }
        }
      }
      return ( ! connection ) ? NULL : connection;
    }
    
  });
  
})();