/*
 COPYRIGHT 2009 ESRI

 TRADE SECRETS: ESRI PROPRIETARY AND CONFIDENTIAL
 Unpublished material - all rights reserved under the
 Copyright Laws of the United States and applicable international
 laws, treaties, and conventions.

 For additional information, contact:
 Environmental Systems Research Institute, Inc.
 Attn: Contracts and Legal Services Department
 380 New York Street
 Redlands, California, 92373
 USA

 email: contracts@esri.com
 */
//>>built
define("esri/toolbars/draw",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/Color","dojo/_base/window","dojo/has","dojo/keys","dojo/dom-construct","dojo/dom-style","esri/kernel","esri/sniff","esri/toolbars/_toolbar","esri/symbols/SimpleMarkerSymbol","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol","esri/graphic","esri/geometry/jsonUtils","esri/geometry/webMercatorUtils","esri/geometry/Polyline","esri/geometry/Polygon","esri/geometry/Multipoint","esri/geometry/Rect","dojo/i18n!esri/nls/jsapi"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,_15,_16,_17,_18){var _19=_1(_d,{declaredClass:"esri.toolbars.Draw",constructor:function(map,_1a){this.markerSymbol=new _e(_e.STYLE_SOLID,10,new _f(_f.STYLE_SOLID,new _5([255,0,0]),2),new _5([0,0,0,0.25]));this.lineSymbol=new _f(_f.STYLE_SOLID,new _5([255,0,0]),2);this.fillSymbol=new _10(_10.STYLE_SOLID,new _f(_f.STYLE_SOLID,new _5([255,0,0]),2),new _5([0,0,0,0.25]));this._points=[];this._defaultOptions={showTooltips:true,drawTime:75,tolerance:8,tooltipOffset:15};this._options=_2.mixin(_2.mixin({},this._defaultOptions),_1a||{});this._mouse=!_7("esri-touch")&&!_7("esri-pointer");if(!this._mouse){this._options.showTooltips=false;}this._onKeyDownHandler=_2.hitch(this,this._onKeyDownHandler);this._onMouseDownHandler=_2.hitch(this,this._onMouseDownHandler);this._onMouseUpHandler=_2.hitch(this,this._onMouseUpHandler);this._onClickHandler=_2.hitch(this,this._onClickHandler);this._onMouseMoveHandler=_2.hitch(this,this._onMouseMoveHandler);this._onMouseDragHandler=_2.hitch(this,this._onMouseDragHandler);this._onDblClickHandler=_2.hitch(this,this._onDblClickHandler);this._updateTooltip=_2.hitch(this,this._updateTooltip);this._hideTooltip=_2.hitch(this,this._hideTooltip);this._redrawGraphic=_2.hitch(this,this._redrawGraphic);},_geometryType:null,respectDrawingVertexOrder:false,setRespectDrawingVertexOrder:function(set){this.respectDrawingVertexOrder=set;},setMarkerSymbol:function(_1b){this.markerSymbol=_1b;},setLineSymbol:function(_1c){this.lineSymbol=_1c;},setFillSymbol:function(_1d){this.fillSymbol=_1d;},activate:function(_1e,_1f){if(this._geometryType){this.deactivate();}var map=this.map,dc=_4.connect,_20=_19;this._options=_2.mixin(_2.mixin({},this._options),_1f||{});map.navigationManager.setImmediateClick(false);switch(_1e){case _20.ARROW:case _20.LEFT_ARROW:case _20.RIGHT_ARROW:case _20.UP_ARROW:case _20.DOWN_ARROW:case _20.TRIANGLE:case _20.CIRCLE:case _20.ELLIPSE:case _20.RECTANGLE:this._deactivateMapTools(true,false,false,true);this._onClickHandler_connect=dc(map,"onClick",this._onClickHandler);this._onMouseDownHandler_connect=dc(map,!this._mouse?"onSwipeStart":"onMouseDown",this._onMouseDownHandler);this._onMouseDragHandler_connect=dc(map,!this._mouse?"onSwipeMove":"onMouseDrag",this._onMouseDragHandler);this._onMouseUpHandler_connect=dc(map,!this._mouse?"onSwipeEnd":"onMouseUp",this._onMouseUpHandler);break;case _20.POINT:this._onClickHandler_connect=dc(map,"onClick",this._onClickHandler);break;case _20.LINE:case _20.EXTENT:case _20.FREEHAND_POLYLINE:case _20.FREEHAND_POLYGON:this._deactivateMapTools(true,false,false,true);this._onMouseDownHandler_connect=dc(map,!this._mouse?"onSwipeStart":"onMouseDown",this._onMouseDownHandler);this._onMouseDragHandler_connect=dc(map,!this._mouse?"onSwipeMove":"onMouseDrag",this._onMouseDragHandler);this._onMouseUpHandler_connect=dc(map,!this._mouse?"onSwipeEnd":"onMouseUp",this._onMouseUpHandler);break;case _20.POLYLINE:case _20.POLYGON:case _20.MULTI_POINT:map.navigationManager.setImmediateClick(true);this._onClickHandler_connect=dc(map,"onClick",this._onClickHandler);this._onDblClickHandler_connect=dc(map,"onDblClick",this._onDblClickHandler);map.disableDoubleClickZoom();break;default:console.error("Unsupported geometry type: "+_1e);return;}this._onKeyDown_connect=dc(map,"onKeyDown",this._onKeyDownHandler);this._redrawConnect=dc(map,"onExtentChange",this._redrawGraphic);this._geometryType=_1e;this._toggleTooltip(true);if(map.snappingManager&&this._geometryType!=="freehandpolyline"&&this._geometryType!=="freehandpolygon"&&this._mouse){map.snappingManager._startSelectionLayerQuery();map.snappingManager._setUpSnapping();}this.onActivate(this._geometryType);},deactivate:function(){var map=this.map;this._clear();var ddc=_4.disconnect;ddc(this._onMouseDownHandler_connect);ddc(this._onMouseMoveHandler_connect);ddc(this._onMouseDragHandler_connect);ddc(this._onMouseUpHandler_connect);ddc(this._onClickHandler_connect);ddc(this._onDblClickHandler_connect);ddc(this._onKeyDown_connect);ddc(this._redrawConnect);this._onMouseDownHandler_connect=this._onMouseMoveHandler_connect=this._onMouseDragHandler_connect=this._onMouseUpHandler_connect=this._onClickHandler_connect=this._onDblClickHandler_connect=this._onKeyDown_connect=this._redrawConnect=null;if(map.snappingManager){map.snappingManager._stopSelectionLayerQuery();map.snappingManager._killOffSnapping();}switch(this._geometryType){case _19.CIRCLE:case _19.ELLIPSE:case _19.TRIANGLE:case _19.ARROW:case _19.LEFT_ARROW:case _19.RIGHT_ARROW:case _19.UP_ARROW:case _19.DOWN_ARROW:case _19.RECTANGLE:case _19.LINE:case _19.EXTENT:case _19.FREEHAND_POLYLINE:case _19.FREEHAND_POLYGON:this._activateMapTools(true,false,false,true);break;case this.POLYLINE:case this.POLYGON:case this.MULTI_POINT:map.enableDoubleClickZoom();break;}var _21=this._geometryType;this._geometryType=null;map.navigationManager.setImmediateClick(false);this._toggleTooltip(false);this.onDeactivate(_21);},_clear:function(){if(this._graphic){this.map.graphics.remove(this._graphic,true);}if(this._tGraphic){this.map.graphics.remove(this._tGraphic,true);}this._graphic=this._tGraphic=null;if(this.map.snappingManager){this.map.snappingManager._setGraphic(null);}this._points=[];},finishDrawing:function(){var _22,_23=this._points,map=this.map,_24=map.spatialReference,_25=_19;_23=_23.slice(0,_23.length);switch(this._geometryType){case _25.POLYLINE:if(!this._graphic||_23.length<2){return;}_22=new _14(_24);_22.addPath([].concat(_23));break;case _25.POLYGON:if(!this._graphic||_23.length<3){return;}_22=new _15(_24);var _26=[].concat(_23,[_23[0].offset(0,0)]);if(!_15.prototype.isClockwise(_26)&&!this.respectDrawingVertexOrder){console.debug(this.declaredClass+" :  Polygons drawn in anti-clockwise direction will be reversed to be clockwise.");_26.reverse();}_22.addRing(_26);break;case _25.MULTI_POINT:_22=new _16(_24);_3.forEach(_23,function(pt){_22.addPoint(pt);});break;}_4.disconnect(this._onMouseMoveHandler_connect);this._clear();this._setTooltipMessage(0);this._drawEnd(_22);},_drawEnd:function(_27){if(_27){var _28=this.map.spatialReference,geo;this.onDrawEnd(_27);if(_28){if(_28.isWebMercator()){geo=_13.webMercatorToGeographic(_27,true);}else{if(_28.wkid===4326){geo=_12.fromJson(_27.toJson());}}}this.onDrawComplete({geometry:_27,geographicGeometry:geo});}},_normalizeRect:function(_29,end,_2a){var sx=_29.x,sy=_29.y,ex=end.x,ey=end.y,_2b=Math.abs(sx-ex),_2c=Math.abs(sy-ey);return {x:Math.min(sx,ex),y:Math.max(sy,ey),width:_2b,height:_2c,spatialReference:_2a};},_onMouseDownHandler:function(evt){this._dragged=false;var _2d;if(this.map.snappingManager){_2d=this.map.snappingManager._snappingPoint;}var _2e=_2d||evt.mapPoint,_2f=_19,map=this.map,_30=map.spatialReference;this._points.push(_2e.offset(0,0));switch(this._geometryType){case _2f.LINE:this._graphic=map.graphics.add(new _11(new _14({paths:[[[_2e.x,_2e.y],[_2e.x,_2e.y]]],spatialReference:_30}),this.lineSymbol),true);if(map.snappingManager){map.snappingManager._setGraphic(this._graphic);}break;case _2f.EXTENT:break;case _2f.FREEHAND_POLYLINE:this._oldPoint=evt.screenPoint;var _31=new _14(_30);_31.addPath(this._points);this._graphic=map.graphics.add(new _11(_31,this.lineSymbol),true);if(map.snappingManager){map.snappingManager._setGraphic(this._graphic);}break;case _2f.CIRCLE:case _2f.ELLIPSE:case _2f.TRIANGLE:case _2f.ARROW:case _2f.LEFT_ARROW:case _2f.RIGHT_ARROW:case _2f.UP_ARROW:case _2f.DOWN_ARROW:case _2f.RECTANGLE:case _2f.FREEHAND_POLYGON:this._oldPoint=evt.screenPoint;var _32=new _15(_30);_32.addRing(this._points);this._graphic=map.graphics.add(new _11(_32,this.fillSymbol),true);if(map.snappingManager){map.snappingManager._setGraphic(this._graphic);}break;}if(_7("esri-touch")){evt.preventDefault();}},_onMouseMoveHandler:function(evt){var _33;if(this.map.snappingManager){_33=this.map.snappingManager._snappingPoint;}var _34=this._points[this._points.length-1],end=_33||evt.mapPoint,_35=this._tGraphic,_36=_35.geometry;switch(this._geometryType){case _19.POLYLINE:case _19.POLYGON:_36.setPoint(0,0,{x:_34.x,y:_34.y});_36.setPoint(0,1,{x:end.x,y:end.y});_35.setGeometry(_36);break;}},_onMouseDragHandler:function(evt){if(_7("esri-touch")&&!this._points.length){evt.preventDefault();return;}this._dragged=true;var _37;if(this.map.snappingManager){_37=this.map.snappingManager._snappingPoint;}var _38=this._points[0],end=_37||evt.mapPoint,map=this.map,_39=map.spatialReference,_3a=this._graphic,_3b=_19,_3c=map.toScreen(_38),_3d=map.toScreen(end),pts=[],a=_3d.x-_3c.x,b=_3d.y-_3c.y,_3e=60,d=Math.sqrt(a*a+b*b);switch(this._geometryType){case _3b.CIRCLE:this._hideTooltip();_3a.geometry=_15.createCircle({center:_3c,r:d,numberOfPoints:_3e,map:map});_3a.setGeometry(_3a.geometry);break;case _3b.ELLIPSE:this._hideTooltip();_3a.geometry=_15.createEllipse({center:_3c,longAxis:a,shortAxis:b,numberOfPoints:_3e,map:map});_3a.setGeometry(_3a.geometry);break;case _3b.TRIANGLE:this._hideTooltip();pts=[[0,-d],[0.8660254037844386*d,0.5*d],[-0.8660254037844386*d,0.5*d],[0,-d]];_3a.geometry=this._toPolygon(pts,_3c.x,_3c.y);_3a.setGeometry(_3a.geometry);break;case _3b.ARROW:this._hideTooltip();var _3f=b/d,_40=a/d,_41=b/a;var f=_40*0.25*d,e=0.25*d/_41,g=_3f*0.25*d;pts=[[a,b],[a-f*(1+24/e),b+24*_40-g],[a-f*(1+12/e),b+12*_40-g],[-12*_3f,12*_40],[12*_3f,-12*_40],[a-f*(1-12/e),b-12*_40-g],[a-f*(1-24/e),b-24*_40-g],[a,b]];_3a.geometry=this._toPolygon(pts,_3c.x,_3c.y);_3a.setGeometry(_3a.geometry);break;case _3b.LEFT_ARROW:this._hideTooltip();if(a<=0){pts=[[a,0],[0.75*a,b],[0.75*a,0.5*b],[0,0.5*b],[0,-0.5*b],[0.75*a,-0.5*b],[0.75*a,-b],[a,0]];}else{pts=[[0,0],[0.25*a,b],[0.25*a,0.5*b],[a,0.5*b],[a,-0.5*b],[0.25*a,-0.5*b],[0.25*a,-b],[0,0]];}_3a.geometry=this._toPolygon(pts,_3c.x,_3c.y);_3a.setGeometry(_3a.geometry);break;case _3b.RIGHT_ARROW:this._hideTooltip();if(a>=0){pts=[[a,0],[0.75*a,b],[0.75*a,0.5*b],[0,0.5*b],[0,-0.5*b],[0.75*a,-0.5*b],[0.75*a,-b],[a,0]];}else{pts=[[0,0],[0.25*a,b],[0.25*a,0.5*b],[a,0.5*b],[a,-0.5*b],[0.25*a,-0.5*b],[0.25*a,-b],[0,0]];}_3a.geometry=this._toPolygon(pts,_3c.x,_3c.y);_3a.setGeometry(_3a.geometry);break;case _3b.UP_ARROW:this._hideTooltip();if(b<=0){pts=[[0,b],[-a,0.75*b],[-0.5*a,0.75*b],[-0.5*a,0],[0.5*a,0],[0.5*a,0.75*b],[a,0.75*b],[0,b]];}else{pts=[[0,0],[-a,0.25*b],[-0.5*a,0.25*b],[-0.5*a,b],[0.5*a,b],[0.5*a,0.25*b],[a,0.25*b],[0,0]];}_3a.geometry=this._toPolygon(pts,_3c.x,_3c.y);_3a.setGeometry(_3a.geometry);break;case _3b.DOWN_ARROW:this._hideTooltip();if(b>=0){pts=[[0,b],[-a,0.75*b],[-0.5*a,0.75*b],[-0.5*a,0],[0.5*a,0],[0.5*a,0.75*b],[a,0.75*b],[0,b]];}else{pts=[[0,0],[-a,0.25*b],[-0.5*a,0.25*b],[-0.5*a,b],[0.5*a,b],[0.5*a,0.25*b],[a,0.25*b],[0,0]];}_3a.geometry=this._toPolygon(pts,_3c.x,_3c.y);_3a.setGeometry(_3a.geometry);break;case _3b.RECTANGLE:this._hideTooltip();pts=[[0,0],[a,0],[a,b],[0,b],[0,0]];_3a.geometry=this._toPolygon(pts,_3c.x,_3c.y);_3a.setGeometry(_3a.geometry);break;case _3b.LINE:_3a.setGeometry(_2.mixin(_3a.geometry,{paths:[[[_38.x,_38.y],[end.x,end.y]]]}));break;case _3b.EXTENT:if(_3a){map.graphics.remove(_3a,true);}var _42=new _17(this._normalizeRect(_38,end,_39));_42._originOnly=true;this._graphic=map.graphics.add(new _11(_42,this.fillSymbol),true);if(map.snappingManager){map.snappingManager._setGraphic(this._graphic);}break;case _3b.FREEHAND_POLYLINE:this._hideTooltip();if(this._canDrawFreehandPoint(evt)===false){if(_7("esri-touch")){evt.preventDefault();}return;}this._points.push(evt.mapPoint.offset(0,0));_3a.geometry._insertPoints([end.offset(0,0)],0);_3a.setGeometry(_3a.geometry);break;case _3b.FREEHAND_POLYGON:this._hideTooltip();if(this._canDrawFreehandPoint(evt)===false){if(_7("esri-touch")){evt.preventDefault();}return;}this._points.push(evt.mapPoint.offset(0,0));_3a.geometry._insertPoints([end.offset(0,0)],0);_3a.setGeometry(_3a.geometry);break;}if(_7("esri-touch")){evt.preventDefault();}},_canDrawFreehandPoint:function(evt){if(!this._oldPoint){return false;}var dx=this._oldPoint.x-evt.screenPoint.x;dx=(dx<0)?dx*-1:dx;var dy=this._oldPoint.y-evt.screenPoint.y;dy=(dy<0)?dy*-1:dy;var _43=this._options.tolerance;if(dx<_43&&dy<_43){return false;}var now=new Date();var _44=now-this._startTime;if(_44<this._options.drawTime){return false;}this._startTime=now;this._oldPoint=evt.screenPoint;return true;},_onMouseUpHandler:function(evt){if(!this._dragged){this._clear();return;}if(this._points.length===0){this._points.push(evt.mapPoint.offset(0,0));}var _45;if(this.map.snappingManager){_45=this.map.snappingManager._snappingPoint;}var _46=this._points[0],end=_45||evt.mapPoint,map=this.map,_47=map.spatialReference,_48=_19,_49;switch(this._geometryType){case _48.CIRCLE:case _48.ELLIPSE:case _48.TRIANGLE:case _48.ARROW:case _48.LEFT_ARROW:case _48.RIGHT_ARROW:case _48.UP_ARROW:case _48.DOWN_ARROW:case _48.RECTANGLE:_49=this._graphic.geometry;break;case _48.LINE:_49=new _14({paths:[[[_46.x,_46.y],[end.x,end.y]]],spatialReference:_47});break;case _48.EXTENT:_49=(new _17(this._normalizeRect(_46,end,_47))).getExtent();break;case _48.FREEHAND_POLYLINE:_49=new _14(_47);_49.addPath([].concat(this._points,[end.offset(0,0)]));break;case _48.FREEHAND_POLYGON:_49=new _15(_47);var _4a=[].concat(this._points,[end.offset(0,0),this._points[0].offset(0,0)]);if(!_15.prototype.isClockwise(_4a)&&!this.respectDrawingVertexOrder){console.debug(this.declaredClass+" :  Polygons drawn in anti-clockwise direction will be reversed to be clockwise.");_4a.reverse();}_49.addRing(_4a);break;}if(_7("esri-touch")){evt.preventDefault();}this._clear();this._drawEnd(_49);},_onClickHandler:function(evt){var _4b;if(this.map.snappingManager){_4b=this.map.snappingManager._snappingPoint;}var _4c=_4b||evt.mapPoint,map=this.map,_4d=map.toScreen(_4c),_4e=_19,pts,dx,dy,_4f,_50,_51;this._points.push(_4c.offset(0,0));switch(this._geometryType){case _4e.POINT:this._drawEnd(_4c.offset(0,0));this._setTooltipMessage(0);break;case _4e.POLYLINE:if(this._points.length===1){var _52=new _14(map.spatialReference);_52.addPath(this._points);this._graphic=map.graphics.add(new _11(_52,this.lineSymbol),true);if(map.snappingManager){map.snappingManager._setGraphic(this._graphic);}this._onMouseMoveHandler_connect=_4.connect(map,"onMouseMove",this._onMouseMoveHandler);this._tGraphic=map.graphics.add(new _11(new _14({paths:[[[_4c.x,_4c.y],[_4c.x,_4c.y]]],spatialReference:map.spatialReference}),this.lineSymbol),true);}else{this._graphic.geometry._insertPoints([_4c.offset(0,0)],0);this._graphic.setGeometry(this._graphic.geometry).setSymbol(this.lineSymbol);_4f=this._tGraphic;_50=_4f.geometry;_50.setPoint(0,0,_4c.offset(0,0));_50.setPoint(0,1,_4c.offset(0,0));_4f.setGeometry(_50);}break;case _4e.POLYGON:if(this._points.length===1){_51=new _15(map.spatialReference);_51.addRing(this._points);this._graphic=map.graphics.add(new _11(_51,this.fillSymbol),true);if(map.snappingManager){map.snappingManager._setGraphic(this._graphic);}this._onMouseMoveHandler_connect=_4.connect(map,"onMouseMove",this._onMouseMoveHandler);this._tGraphic=map.graphics.add(new _11(new _14({paths:[[[_4c.x,_4c.y],[_4c.x,_4c.y]]],spatialReference:map.spatialReference}),this.fillSymbol),true);}else{this._graphic.geometry._insertPoints([_4c.offset(0,0)],0);this._graphic.setGeometry(this._graphic.geometry).setSymbol(this.fillSymbol);_4f=this._tGraphic;_50=_4f.geometry;_50.setPoint(0,0,_4c.offset(0,0));_50.setPoint(0,1,_4c.offset(0,0));_4f.setGeometry(_50);}break;case _4e.MULTI_POINT:var tps=this._points;if(tps.length===1){var _53=new _16(map.spatialReference);_53.addPoint(tps[tps.length-1]);this._graphic=map.graphics.add(new _11(_53,this.markerSymbol),true);if(map.snappingManager){map.snappingManager._setGraphic(this._graphic);}}else{this._graphic.geometry.addPoint(tps[tps.length-1]);this._graphic.setGeometry(this._graphic.geometry).setSymbol(this.markerSymbol);}break;case _4e.ARROW:pts=[[0,0],[-24,24],[-24,12],[-96,12],[-96,-12],[-24,-12],[-24,-24],[0,0]];dx=_4d.x;dy=_4d.y;this._addShape(pts,dx,dy);break;case _4e.LEFT_ARROW:pts=[[0,0],[24,24],[24,12],[96,12],[96,-12],[24,-12],[24,-24],[0,0]];dx=_4d.x;dy=_4d.y;this._addShape(pts,dx,dy);break;case _4e.RIGHT_ARROW:pts=[[0,0],[-24,24],[-24,12],[-96,12],[-96,-12],[-24,-12],[-24,-24],[0,0]];dx=_4d.x;dy=_4d.y;this._addShape(pts,dx,dy);break;case _4e.UP_ARROW:pts=[[0,0],[-24,24],[-12,24],[-12,96],[12,96],[12,24],[24,24],[0,0]];dx=_4d.x;dy=_4d.y;this._addShape(pts,dx,dy);break;case _4e.DOWN_ARROW:pts=[[0,0],[-24,-24],[-12,-24],[-12,-96],[12,-96],[12,-24],[24,-24],[0,0]];dx=_4d.x;dy=_4d.y;this._addShape(pts,dx,dy);break;case _4e.TRIANGLE:pts=[[0,-48],[41.56921938165306,24],[-41.56921938165306,24],[0,-48]];dx=_4d.x;dy=_4d.y;this._addShape(pts,dx,dy);break;case _4e.RECTANGLE:pts=[[0,-96],[96,-96],[96,0],[0,0],[0,-96]];dx=_4d.x-48;dy=_4d.y+48;this._addShape(pts,dx,dy);break;case _4e.CIRCLE:_51=new _15(map.spatialReference);this._graphic=map.graphics.add(new _11(_51,this.fillSymbol),true);this._graphic.geometry=_15.createCircle({center:_4d,r:48,numberOfPoints:60,map:map});this._graphic.setGeometry(this._graphic.geometry);this._drawEnd(this._graphic.geometry);break;case _4e.ELLIPSE:_51=new _15(map.spatialReference);this._graphic=map.graphics.add(new _11(_51,this.fillSymbol),true);this._graphic.geometry=_15.createEllipse({center:_4d,longAxis:48,shortAxis:24,numberOfPoints:60,map:map});this._graphic.setGeometry(this._graphic.geometry);this._drawEnd(this._graphic.geometry);break;}this._setTooltipMessage(this._points.length);},_addShape:function(_54,dx,dy){var _55=this.map.graphics.add(new _11(this._toPolygon(_54,dx,dy),this.fillSymbol),true);this._setTooltipMessage(0);var _56;if(_55){_56=_12.fromJson(_55.geometry.toJson());this.map.graphics.remove(_55,true);}this._drawEnd(_56);_55=_56=null;},_toPolygon:function(_57,dx,dy){var map=this.map;var _58=new _15(map.spatialReference);_58.addRing(_3.map(_57,function(pt){return map.toMap({x:pt[0]+dx,y:pt[1]+dy});}));return _58;},_onDblClickHandler:function(evt){var _59,_5a=this._points,map=this.map,_5b=map.spatialReference,_5c=_19;if(_7("esri-touch")){_5a.push(evt.mapPoint);}_5a=_5a.slice(0,_5a.length);switch(this._geometryType){case _5c.POLYLINE:if(!this._graphic||_5a.length<2){_4.disconnect(this._onMouseMoveHandler_connect);this._clear();this._onClickHandler(evt);return;}_59=new _14(_5b);_59.addPath([].concat(_5a));break;case _5c.POLYGON:if(!this._graphic||_5a.length<2){_4.disconnect(this._onMouseMoveHandler_connect);this._clear();this._onClickHandler(evt);return;}_59=new _15(_5b);var _5d=[].concat(_5a,[_5a[0].offset(0,0)]);if(!_15.prototype.isClockwise(_5d)&&!this.respectDrawingVertexOrder){console.debug(this.declaredClass+" :  Polygons drawn in anti-clockwise direction will be reversed to be clockwise.");_5d.reverse();}_59.addRing(_5d);break;case _5c.MULTI_POINT:_59=new _16(_5b);_3.forEach(_5a,function(pt){_59.addPoint(pt);});break;}_4.disconnect(this._onMouseMoveHandler_connect);this._clear();this._setTooltipMessage(0);this._drawEnd(_59);},_onKeyDownHandler:function(evt){if(evt.keyCode===_8.ESCAPE){_4.disconnect(this._onMouseMoveHandler_connect);this._clear();this._setTooltipMessage(0);}},_toggleTooltip:function(_5e){if(!this._options.showTooltips){return;}if(_5e){if(this._tooltip){return;}var _5f=this.map.container;this._tooltip=_9.create("div",{"class":"tooltip"},_5f);this._tooltip.style.display="none";this._tooltip.style.position="fixed";this._setTooltipMessage(0);this._onTooltipMouseEnterHandler_connect=_4.connect(this.map,"onMouseOver",this._updateTooltip);this._onTooltipMouseLeaveHandler_connect=_4.connect(this.map,"onMouseOut",this._hideTooltip);this._onTooltipMouseMoveHandler_connect=_4.connect(this.map,"onMouseMove",this._updateTooltip);}else{if(this._tooltip){_4.disconnect(this._onTooltipMouseEnterHandler_connect);_4.disconnect(this._onTooltipMouseLeaveHandler_connect);_4.disconnect(this._onTooltipMouseMoveHandler_connect);_9.destroy(this._tooltip);this._tooltip=null;}}},_hideTooltip:function(){var _60=this._tooltip;if(!_60){return;}_60.style.display="none";},_setTooltipMessage:function(_61){var _62=this._tooltip;if(!_62){return;}var _63=_61;var _64="";switch(this._geometryType){case _19.POINT:_64=_18.toolbars.draw.addPoint;break;case _19.ARROW:case _19.LEFT_ARROW:case _19.RIGHT_ARROW:case _19.UP_ARROW:case _19.DOWN_ARROW:case _19.TRIANGLE:case _19.RECTANGLE:case _19.CIRCLE:case _19.ELLIPSE:_64=_18.toolbars.draw.addShape;break;case _19.LINE:case _19.EXTENT:case _19.FREEHAND_POLYLINE:case _19.FREEHAND_POLYGON:_64=_18.toolbars.draw.freehand;break;case _19.POLYLINE:case _19.POLYGON:_64=_18.toolbars.draw.start;if(_63===1){_64=_18.toolbars.draw.resume;}else{if(_63>=2){_64=_18.toolbars.draw.complete;}}break;case _19.MULTI_POINT:_64=_18.toolbars.draw.addMultipoint;if(_63>=1){_64=_18.toolbars.draw.finish;}break;}_62.innerHTML=_64;},_updateTooltip:function(evt){var _65=this._tooltip;if(!_65){return;}var px,py;if(evt.clientX||evt.pageY){px=evt.clientX;py=evt.clientY;}else{px=evt.clientX+_6.body().scrollLeft-_6.body().clientLeft;py=evt.clientY+_6.body().scrollTop-_6.body().clientTop;}_65.style.display="none";_a.set(_65,{left:(px+this._options.tooltipOffset)+"px",top:py+"px"});_65.style.display="";},_redrawGraphic:function(_66,_67,_68,lod){if(_68||this.map.wrapAround180){var g=this._graphic;if(g){g.setGeometry(g.geometry);}g=this._tGraphic;if(g){g.setGeometry(g.geometry);}}},onActivate:function(){},onDeactivate:function(){},onDrawComplete:function(){},onDrawEnd:function(){}});_2.mixin(_19,{POINT:"point",MULTI_POINT:"multipoint",LINE:"line",EXTENT:"extent",POLYLINE:"polyline",POLYGON:"polygon",FREEHAND_POLYLINE:"freehandpolyline",FREEHAND_POLYGON:"freehandpolygon",ARROW:"arrow",LEFT_ARROW:"leftarrow",RIGHT_ARROW:"rightarrow",UP_ARROW:"uparrow",DOWN_ARROW:"downarrow",TRIANGLE:"triangle",CIRCLE:"circle",ELLIPSE:"ellipse",RECTANGLE:"rectangle"});if(_7("extend-esri")){_2.setObject("toolbars.Draw",_19,_b);}return _19;});