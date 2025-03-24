/**
* @projectDescription {Project Name}.
*  {Libraries Description}
*
* @author Phanara Sok
* @version 2.0
*/
/* jshint globalstrict: true, unused: true, undef: true, quotmark: true, browser: true, loopfunc: true */
/* global jQuery */
/* exported */
'use strict';
var hideSwitchLanguage = false;
var language = 'en';
var subsection = 'a';
var subMenuItem = 'subMenuItem1';
var subSubMenu = '';
var subSubMenuItem = '';
var colorSection1 = "";
var arraySubSection = new Array();
var subSectionIndex = 0;
var subSectionIndexMax = 0;
var subSubSectionIndex = 0;
var arrayBulletProgress = new Array();
var bulletProgressIndex = -1;
var bulletProgressIndexMax = -1;
var carrouselLeftChild = null;
var carrouselLeftChildWidth = 0;
var carrouselLeftVisibleThumbnailCount = 8;
var carrouselRightChild = null;
var carrouselRightChildWidth = 0;
var thumbnailCurrentImage = null;
var isCarrouselMousedown = false;
var carrouselX = 0;
var carrouselPrevX = 0;
var carrouselMousedownX = 0;
var carrouselMouseupX = 0;
var arrayCarrouselMouseMove = new Array();
var autoScrollCarrouselTimerObj = null;
var autoScrollDistance = 0;
var autoScrollCarrouselCount = 0;
var autoScrollCarrouselMax = 0;
var arrayThumbnail = new Array();
var thumbnailIndex = -1;
var thumbnailIndexMax = -1;
var thumbnailWidth = 96;
var thumbnailCurrentWidth = 130;
var checkCarrouselMousedownTimerObj = null;
var descriptionX = 0;
var descriptionY = 0;
var checkAutoRestartTimerObj = null;
var viewScreenFrame = null;
function hideHomeScreen() {
    if (hideSwitchLanguage === false) {
        $('#en')
        .removeClass('homeLanguageButtonColor')
        .addClass('previewLanguageButtonColor');
        $('#fr')
        .removeClass('homeLanguageButtonColor')
        .addClass('previewLanguageButtonColor');
        $('#kh')
        .removeClass('homeLanguageButtonColor')
        .addClass('previewLanguageButtonColor');
    }
    $('#homeScreenFrame').addClass('hideEle');
    $('#viewScreenFrame').removeClass('hideEle');
}
function hideViewScreen() {
    if (hideSwitchLanguage === false) {
        $('#en')
        .removeClass('previewLanguageButtonColor')
        .addClass('homeLanguageButtonColor');
        $('#fr')
        .removeClass('previewLanguageButtonColor')
        .addClass('homeLanguageButtonColor');
        $('#kh')
        .removeClass('previewLanguageButtonColor')
        .addClass('homeLanguageButtonColor');
    }
    $('#viewScreenFrame').addClass('hideEle');
    $('#homeScreenFrame').removeClass('hideEle');
}
function showViewScreen() {
    subMenuItem = 'subMenuItem1';
    subSubMenu = '';
    subSubMenuItem = '';
    subSubSectionIndex = 0;
    selectNextMenuItem(0);
    hideHomeScreen();
    startCheckAutoRestart();
}
function changeLanguage(language) {
    var sectionTitle = dataSection[1 * section.replace('section', '') - 1][language];
    $('#homeSectionTitle').html(sectionTitle);
    var sectionDescription = dataSection[1 * section.replace('section', '') - 1].description[language];
    $('#homeSectionDescription').html(sectionDescription);
    $('#homeTitle').html(dataHome[language]);
    refreshMenuData();
    refreshCarrousel(section, subsection, language);
    refreshLanguageFont();
}
function refreshLanguageFont() {
    $('#homeTitle').removeClass('homeTitleen');
    $('#homeTitle').removeClass('homeTitlefr');
    $('#homeTitle').removeClass('homeTitlekh');
    $('#homeTitle').addClass('homeTitle' + language);
    $('.subMenuItemText').removeClass('subMenuItemTexten');
    $('.subMenuItemText').removeClass('subMenuItemTextfr');
    $('.subMenuItemText').removeClass('subMenuItemTextkh');
    $('.subMenuItemText').addClass('subMenuItemText' + language);
    $('.subSubMenuItem').removeClass('subSubMenuItemen');
    $('.subSubMenuItem').removeClass('subSubMenuItemfr');
    $('.subSubMenuItem').removeClass('subSubMenuItemkh');
    $('.subSubMenuItem').addClass('subSubMenuItem' + language);
    $('#imageViewText').removeClass('imageViewTexten');
    $('#imageViewText').removeClass('imageViewTextfr');
    $('#imageViewText').removeClass('imageViewTextkh');
    $('#imageViewText').addClass('imageViewText' + language);
    $('.descriptionTextLine').removeClass('descriptionTextLineen');
    $('.descriptionTextLine').removeClass('descriptionTextLinefr');
    $('.descriptionTextLine').removeClass('descriptionTextLinekh');
    $('.descriptionTextLine').addClass('descriptionTextLine' + language);
    $('.descriptionBulletText').removeClass('descriptionBulletTexten');
    $('.descriptionBulletText').removeClass('descriptionBulletTextfr');
    $('.descriptionBulletText').removeClass('descriptionBulletTextkh');
    $('.descriptionBulletText').addClass('descriptionBulletText' + language);
    $('#homeSectionTitle').removeClass('homeSectionTitleen_' + section);
    $('#homeSectionTitle').removeClass('homeSectionTitlefr_' + section);
    $('#homeSectionTitle').removeClass('homeSectionTitlekh_' + section);
    $('#homeSectionTitle').addClass('homeSectionTitle' + language + '_' + section);
    $('#homeSectionDescription').removeClass('homeSectionDescriptionen_' + section);
    $('#homeSectionDescription').removeClass('homeSectionDescriptionfr_' + section);
    $('#homeSectionDescription').removeClass('homeSectionDescriptionkh_' + section);
    $('#homeSectionDescription').addClass('homeSectionDescription' + language + '_' + section);
}
function loadMenu(section) {
    arraySubSection = new Array();
    $('#subMenu').empty();
    subSectionIndex = 0;
    subSectionIndexMax = 0;
    subSubSectionIndex = 0;
    for (var i = 0; i < dataSection.length; i++) {
        if (dataSection[i].section === section) {
            for (var k = 0; k < dataSection[i].subsection.length; k++) {
                subSectionIndex++;
                arraySubSection[subSectionIndex] = {};
                arraySubSection[subSectionIndex].subSubSectionCount = dataSection[i].subsection[k].subsubsection.length;
                arraySubSection[subSectionIndex].divIdSubMenuItem = 'subMenuItem' + subSectionIndex;
                arraySubSection[subSectionIndex].divIdSubMenuItemNumber = 'subMenuItemNumber' + subSectionIndex;
                arraySubSection[subSectionIndex].numbering = dataSection[i].subsection[k].numbering[language];
                arraySubSection[subSectionIndex].divIdSubMenuItemText = 'subMenuItemText' + subSectionIndex;
                arraySubSection[subSectionIndex].content = dataSection[i].subsection[k][language];
                var $div = '<div id="' + arraySubSection[subSectionIndex].divIdSubMenuItem + '"';
                    $div += ' class="subMenuItem" ';
                    $div += ' subsection="' + dataSection[i].subsection[k].item + '"';
                    $div += ' subSectionIndex="' + subSectionIndex + '"';
                    $div += ' nbchild="' + dataSection[i].subsection[k].subsubsection.length + '"';
                    $div += ' >';
                    $div += '<div class="subMenuItemTopLine" >';
                        $div += '<div id="' + arraySubSection[subSectionIndex].divIdSubMenuItemNumber + '"';
                            $div += ' class="subMenuItemNumber_' + section + '"';
                            $div += ' >';
                            $div += arraySubSection[subSectionIndex].numbering;
                            $div += '</div>';
                        $div += '<div id="' + arraySubSection[subSectionIndex].divIdSubMenuItemText + '"';
                            $div += ' class="subMenuItemText"';
                            $div += ' lang-kh="' +dataSection[i].subsection[k].kh + '"';
                            $div += ' lang-en="' + dataSection[i].subsection[k].en + '"';
                            $div += ' lang-fr="' + dataSection[i].subsection[k].fr + '">';
                            $div += arraySubSection[subSectionIndex].content;
                            $div += '</div>';
                        if (dataSection[i].subsection[k].subsubsection.length > 0) {
                            $div += '<div id="subMenuItemShowChild' + subSectionIndex + '"';
                                $div += ' class="subMenuItemShowChild"';
                                $div += ' >';
                                $div += '</div>';
                        }
                        $div += '</div>';
                    if (dataSection[i].subsection[k].subsubsection.length > 0) {
                        arraySubSection[subSectionIndex].divIdSubSubSectionGroup = 'subSubMenu' + subSectionIndex;
                        $div += '<div id="' + arraySubSection[subSectionIndex].divIdSubSubSectionGroup + '"';
                        $div += ' class="subSubMenu" ';
                        $div += ' style="display: none;"';
                        $div += '>';
                        subSubSectionIndex = 0;
                        arraySubSection[subSectionIndex].arraySubSubSection = new Array();
                        for (var m = 0; m < dataSection[i].subsection[k].subsubsection.length; m++) {
                            subSubSectionIndex++;
                            arraySubSection[subSectionIndex].arraySubSubSection[subSubSectionIndex] = {};
                            arraySubSection[subSectionIndex].arraySubSubSection[subSubSectionIndex].divIdSubSubMenuItem = 'subSubMenuItem' + dataSection[i].subsection[k].subsubsection[m].item;
                            arraySubSection[subSectionIndex].arraySubSubSection[subSubSectionIndex].numbering = dataSection[i].subsection[k].subsubsection[m].numbering[language];
                            arraySubSection[subSectionIndex].arraySubSubSection[subSubSectionIndex].content = dataSection[i].subsection[k].subsubsection[m][language];
                            $div += '<div id="' + arraySubSection[subSectionIndex].arraySubSubSection[subSubSectionIndex].divIdSubSubMenuItem + '"';
                            $div += ' class="subSubMenuItem"';
                            $div += ' subsection="' + dataSection[i].subsection[k].subsubsection[m].item + '"';
                            $div += ' subSubSectionIndex="' + subSubSectionIndex + '"';
                            $div += '>';
                            $div += arraySubSection[subSectionIndex].arraySubSubSection[subSubSectionIndex].numbering + arraySubSection[subSectionIndex].arraySubSubSection[subSubSectionIndex].content;
                            $div += '</div>';
                        }
                        $div += '</div>';
                    }
                    $div += '</div>';
                $('#subMenu').append($div);
            }
        }
    }
    subSectionIndexMax = subSectionIndex;
}
function refreshMenuData() {
    var subSectionIndex = 0;
    var subSubSectionIndex = 0;
    subSectionIndex = 0;
    subSubSectionIndex = 0;
    for (var i = 0; i < dataSection.length; i++) {
        if (dataSection[i].section === section) {
            for (var k = 0; k < dataSection[i].subsection.length; k++) {
                subSectionIndex++;
                arraySubSection[subSectionIndex].content = dataSection[i].subsection[k][language];
                $('#' + arraySubSection[subSectionIndex].divIdSubMenuItemText).html(arraySubSection[subSectionIndex].content);
                arraySubSection[subSectionIndex].numbering = dataSection[i].subsection[k].numbering[language];
                $('#' + arraySubSection[subSectionIndex].divIdSubMenuItemNumber).html(arraySubSection[subSectionIndex].numbering);
                if (dataSection[i].subsection[k].subsubsection.length > 0) {
                    subSubSectionIndex = 0;
                    for (var m = 0; m < dataSection[i].subsection[k].subsubsection.length; m++) {
                        subSubSectionIndex++;
                        arraySubSection[subSectionIndex].arraySubSubSection[subSubSectionIndex].numbering = dataSection[i].subsection[k].subsubsection[m].numbering[language];
                        arraySubSection[subSectionIndex].arraySubSubSection[subSubSectionIndex].content = dataSection[i].subsection[k].subsubsection[m][language];
                        $('#' + arraySubSection[subSectionIndex].arraySubSubSection[subSubSectionIndex].divIdSubSubMenuItem).html(arraySubSection[subSectionIndex].arraySubSubSection[subSubSectionIndex].numbering + arraySubSection[subSectionIndex].arraySubSubSection[subSubSectionIndex].content);
                    }
                }
            }
        }
    }
}
function selectNextMenuItem(currentSubSectionIndex) {
    var subSectionIndexPrev = subSectionIndex;
    subSectionIndex = currentSubSectionIndex;
    if (subSectionIndex <= 0) {
        subSectionIndex = 1;
        if (arraySubSection[subSectionIndex].subSubSectionCount > 0) {
            subSubSectionIndex = 1;
        }
        else if (arraySubSection[subSectionIndex].subSubSectionCount <= 0) {
            subSubSectionIndex = 0;
        }
    }
    else if (subSectionIndex > 0) {
        if (arraySubSection[subSectionIndex].subSubSectionCount > 0) {
            if (subSubSectionIndex < arraySubSection[subSectionIndex].subSubSectionCount) {
                subSubSectionIndex++;
            }
            else if (subSubSectionIndex >= arraySubSection[subSectionIndex].subSubSectionCount) {
                if (subSectionIndex < subSectionIndexMax) {
                    subSectionIndex++;
                    if (arraySubSection[subSectionIndex].subSubSectionCount > 0) {
                        subSubSectionIndex = 1;
                    }
                    else {
                        subSubSectionIndex = 0;
                    }
                }
                else {
                    return;
                }
            }
        }
        else if (arraySubSection[subSectionIndex].subSubSectionCount <= 0) {
            if (subSectionIndex < subSectionIndexMax) {
                subSectionIndex++;
                if (arraySubSection[subSectionIndex].subSubSectionCount > 0) {
                    subSubSectionIndex = 1;
                }
                else {
                    subSubSectionIndex = 0;
                }
            }
            else {
                return;
            }
        }
    }
    if (subSectionIndex !== subSectionIndexPrev) {
        $('#subSubMenu' + subSectionIndexPrev).css('display', 'none');
        $('#subMenuItemShowChild' + subSectionIndexPrev).removeClass('subMenuItemHideChild');
        subSubMenu = "";
    }
    $('.subMenuItem').removeClass('mainBackgroundColor07_' + section);
    $('#' + arraySubSection[subSectionIndex].divIdSubMenuItem).addClass('mainBackgroundColor07_' + section);
    if (subSubSectionIndex > 0) {
        subsection = $('#' + arraySubSection[subSectionIndex].arraySubSubSection[subSubSectionIndex].divIdSubSubMenuItem).attr('subsection');
    }
    else if (subSubSectionIndex <= 0) {
        subsection = $('#' + arraySubSection[subSectionIndex].divIdSubMenuItem).attr('subsection');
    }
    $('.subSubMenuItem').removeClass('subSubMenuItemActive_' + section);
    if (subSubSectionIndex === 1) {
        $('.subMenuItemShowChild').removeClass('subMenuItemHideChild');
        $('#subMenuItemShowChild' + subSectionIndex).addClass('subMenuItemHideChild');
        $('#' + arraySubSection[subSectionIndex].divIdSubSubSectionGroup).css('display', 'block');
        $('#' + arraySubSection[subSectionIndex].arraySubSubSection[subSubSectionIndex].divIdSubSubMenuItem).addClass('subSubMenuItemActive_' + section);
    }
    else if (subSubSectionIndex > 1) {
        $('#' + arraySubSection[subSectionIndex].arraySubSubSection[subSubSectionIndex].divIdSubSubMenuItem).addClass('subSubMenuItemActive_' + section);
    }
    else if (subSubSectionIndex <= 0) {
        $('.subMenuItemShowChild').removeClass('subMenuItemHideChild');
        $('#subMenuItemShowChild' + subSectionIndex).addClass('subMenuItemHideChild');
    }
    loadCarrousel(section, subsection);
}
function loadCarrousel(section, subsection) {
    arrayBulletProgress = new Array();
    arrayThumbnail = new Array();
    $('#bulletProgress').empty();
    $('#carrouselLeftChild').empty();
    $('#carrouselRightChild').empty();
    bulletProgressIndex = 0;
    bulletProgressIndexMax = 0;
    thumbnailIndex = 0;
    thumbnailIndexMax = 0;
    carrouselLeftChildWidth = 0;
    carrouselRightChildWidth = 0;
    var $divProgress = "";
    var $divLeft = "";
    var $divRight = "";
    var arrayItemWithNoImage = new Array();
    var itemWithNoImageIndex = 0;
    for (var i = 0; i < dataItems.length; i++) {
        if (dataItems[i].section === section && dataItems[i].subsection === subsection) {
            if (dataItems[i].item === 'description') {
                if (dataItems[i].thumbnail.items.length > 0) {
                    for (var k = 0; k < dataItems[i].thumbnail.items.length; k++) {
                        thumbnailIndex++;
                        arrayThumbnail[thumbnailIndex] = {};
                        arrayThumbnail[thumbnailIndex].numbering = dataItems[i].numbering[language];
                        arrayThumbnail[thumbnailIndex].content = dataItems[i].content[language];
                        arrayThumbnail[thumbnailIndex].isDescription = true;
                        arrayThumbnail[thumbnailIndex].haveImage = true;
                        $divLeft += '<div id="thumbnail' + thumbnailIndex + '"';
                            $divLeft += ' class="thumbnail"';
                            $divLeft += '>';
                            $divLeft += '<img id="thumbnailImageLeft' + thumbnailIndex + '"';
                                $divLeft += ' class="thumbnailLeftImage"';
                                $divLeft += ' src="' + dataItems[i].thumbnail.items[k] + '"';
                                $divLeft += ' alt=""';
                                if (k == 0) {
                                    $divLeft += ' haveBullet="1"';
                                }
                                else {
                                    $divLeft += ' haveBullet="0"';
                                }
                                $divLeft += " onclick=\"onClickThumbnailImage(" + thumbnailIndex + ")\"";
                                $divLeft += '/>';
                            $divLeft += '<div id="thumbnailLeftBullet' + thumbnailIndex + '"';
                                $divLeft += ' class="thumbnailLeftBullet"';
                                $divLeft += '>';
                                if (k == 0) {
                                    $divLeft += '<img ';
                                        $divLeft += ' src="../images/common/bulletThumbnail' + section + '.png"';
                                        $divLeft += '  alt=""';
                                        $divLeft += '/>';
                                }
                                $divLeft += '</div>';
                            $divLeft += '</div>';
                        carrouselLeftChildWidth += thumbnailWidth;
                        $divRight += '<div id="thumbnail' + thumbnailIndex + '"';
                            $divRight += ' class="thumbnail"';
                            $divRight += '>';
                            $divRight += '<img id="thumbnailImageRight' + thumbnailIndex + '"';
                                $divRight += ' class="thumbnailRightImage"';
                                $divRight += ' src="' + dataItems[i].thumbnail.items[k] + '"';
                                $divRight += ' alt=""';
                                $divRight += ' subSubSectionIndex="' + bulletProgressIndex + '"';
                                if (k == 0) {
                                    $divRight += ' haveBullet="1"';
                                }
                                else {
                                    $divRight += ' haveBullet="0"';
                                }
                                $divRight += " onclick=\"onClickThumbnailImage(" + thumbnailIndex + ")\"";
                                $divRight += '/>';
                            $divRight += '<div id="thumbnailRightBullet' + thumbnailIndex + '"';
                                $divRight += ' class="thumbnailRightBullet"';
                                $divRight += '>';
                                if (k == 0) {
                                    $divRight += '<img ';
                                        $divRight += ' src="../images/common/bulletThumbnail' + section + '.png"';
                                        $divRight += ' alt=""';
                                        $divRight += '/>';
                                }
                                $divRight += '</div>';
                            $divRight += '</div>';
                        carrouselRightChildWidth += thumbnailWidth;
                    }
                }
                else {
                    thumbnailIndex++;
                    arrayThumbnail[thumbnailIndex] = {};
                    arrayThumbnail[thumbnailIndex].numbering = dataItems[i].numbering[language];
                    arrayThumbnail[thumbnailIndex].content = dataItems[i].content[language];
                    arrayThumbnail[thumbnailIndex].isDescription = true;
                    arrayThumbnail[thumbnailIndex].haveImage = false;
                    $divLeft += '<div id="thumbnail' + thumbnailIndex + '"';
                        $divLeft += ' class="thumbnail"';
                        $divLeft += '>';
                        $divLeft += '<img id="thumbnailImageLeft' + thumbnailIndex + '"';
                            $divLeft += ' class="thumbnailLeftImage"';
                            $divLeft += ' style="border: 1px solid black;"';
                            $divLeft += ' src="../images/common/emptyImage.png"';
                            $divLeft += ' alt=""';
                            $divLeft += ' haveBullet="1"';
                            $divLeft += " onclick=\"onClickThumbnailImage(" + thumbnailIndex + ")\"";
                            $divLeft += '/>';
                        $divLeft += '<div id="thumbnailLeftBullet' + thumbnailIndex + '"';
                            $divLeft += ' class="thumbnailLeftBullet"';
                            $divLeft += '>';
                            $divLeft += '<img ';
                                $divLeft += ' src="../images/common/bulletThumbnail' + section + '.png"';
                                $divLeft += '  alt=""';
                                $divLeft += '/>';
                            $divLeft += '</div>';
                        $divLeft += '</div>';
                    carrouselLeftChildWidth += thumbnailWidth;
                    $divRight += '<div id="thumbnail' + thumbnailIndex + '"';
                        $divRight += ' class="thumbnail"';
                        $divRight += '>';
                        $divRight += '<img id="thumbnailImageRight' + thumbnailIndex + '"';
                            $divRight += ' class="thumbnailRightImage"';
                            $divRight += ' style="border: 1px solid black;"';
                            $divRight += ' src="../images/common/emptyImage.png"';
                            $divRight += ' alt=""';
                            $divRight += ' subSubSectionIndex="' + '0' + '"';
                            $divRight += ' haveBullet="1"';
                            $divRight += " onclick=\"onClickThumbnailImage(" + thumbnailIndex + ")\"";
                            $divRight += '/>';
                        $divRight += '<div id="thumbnailRightBullet' + thumbnailIndex + '"';
                            $divRight += ' class="thumbnailRightBullet"';
                            $divRight += '>';
                            $divRight += '<img ';
                                $divRight += ' src="../images/common/bulletThumbnail' + section + '.png"';
                                $divRight += ' alt=""';
                                $divRight += '/>';
                            $divRight += '</div>';
                        $divRight += '</div>';
                    carrouselRightChildWidth += thumbnailWidth;
                }
            }
            else {
                if (dataItems[i].thumbnail.items.length > 0) {
                    bulletProgressIndex++;
                    arrayBulletProgress[bulletProgressIndex] = {};
                    arrayBulletProgress[bulletProgressIndex].content = dataItems[i].content[language];
                    $divProgress += '<img id="bulletProgressImage' + bulletProgressIndex + '"';
                        $divProgress += ' class="bulletProgressImage"';
                        $divProgress += ' src="../images/common/bulletProgresstoview' + section + '.png"';
                        $divProgress += ' alt=""';
                        $divProgress += '/>';
                    for (var k = 0; k < dataItems[i].thumbnail.items.length; k++) {
                        thumbnailIndex++;
                        arrayThumbnail[thumbnailIndex] = {};
                        arrayThumbnail[thumbnailIndex].content = dataItems[i].content[language];
                        arrayThumbnail[thumbnailIndex].isDescription = false;
                        arrayThumbnail[thumbnailIndex].haveImage = true;
                        $divLeft += '<div id="thumbnail' + thumbnailIndex + '"';
                            $divLeft += ' class="thumbnail"';
                            $divLeft += '>';
                            $divLeft += '<img id="thumbnailImageLeft' + thumbnailIndex + '"';
                                $divLeft += ' class="thumbnailLeftImage"';
                                $divLeft += ' src="' + dataItems[i].thumbnail.items[k] + '"';
                                $divLeft += ' alt=""';
                                if (k == 0) {
                                    $divLeft += ' haveBullet="1"';
                                }
                                else {
                                    $divLeft += ' haveBullet="0"';
                                }
                                $divLeft += " onclick=\"onClickThumbnailImage(" + thumbnailIndex + ")\"";
                                $divLeft += '/>';
                            $divLeft += '<div id="thumbnailLeftBullet' + thumbnailIndex + '"';
                                $divLeft += ' class="thumbnailLeftBullet"';
                                $divLeft += '>';
                                if (k == 0) {
                                    $divLeft += '<img ';
                                        $divLeft += ' src="../images/common/bulletThumbnail' + section + '.png"';
                                        $divLeft += '  alt=""';
                                        $divLeft += '/>';
                                }
                                $divLeft += '</div>';
                            $divLeft += '</div>';
                        carrouselLeftChildWidth += thumbnailWidth;
                        $divRight += '<div id="thumbnail' + thumbnailIndex + '"';
                            $divRight += ' class="thumbnail"';
                            $divRight += '>';
                            $divRight += '<img id="thumbnailImageRight' + thumbnailIndex + '"';
                                $divRight += ' class="thumbnailRightImage"';
                                $divRight += ' src="' + dataItems[i].thumbnail.items[k] + '"';
                                $divRight += ' alt=""';
                                $divRight += ' subSubSectionIndex="' + bulletProgressIndex + '"';
                                if (k == 0) {
                                    $divRight += ' haveBullet="1"';
                                }
                                else {
                                    $divRight += ' haveBullet="0"';
                                }
                                $divRight += " onclick=\"onClickThumbnailImage(" + thumbnailIndex + ")\"";
                                $divRight += '/>';
                            $divRight += '<div id="thumbnailRightBullet' + thumbnailIndex + '"';
                                $divRight += ' class="thumbnailRightBullet"';
                                $divRight += '>';
                                if (k == 0) {
                                    $divRight += '<img ';
                                        $divRight += ' src="../images/common/bulletThumbnail' + section + '.png"';
                                        $divRight += ' alt=""';
                                        $divRight += '/>';
                                }
                                $divRight += '</div>';
                            $divRight += '</div>';
                        carrouselRightChildWidth += thumbnailWidth;
                        if (k === 0) {
                            arrayBulletProgress[bulletProgressIndex].minThumbnailIndex = thumbnailIndex;
                        }
                        arrayBulletProgress[bulletProgressIndex].maxThumbnailIndex = thumbnailIndex;
                    }
                }
                else {
                    bulletProgressIndex++;
                    arrayBulletProgress[bulletProgressIndex] = {};
                    arrayBulletProgress[bulletProgressIndex].content = dataItems[i].content[language];
                    $divProgress += '<img id="bulletProgressImage' + bulletProgressIndex + '"';
                        $divProgress += ' class="bulletProgressImage"';
                        $divProgress += ' src="../images/common/bulletProgresstoview' + section + '.png"';
                        $divProgress += ' alt=""';
                        $divProgress += '/>';
                    thumbnailIndex++;
                    arrayThumbnail[thumbnailIndex] = {};
                    arrayThumbnail[thumbnailIndex].content = dataItems[i].content[language];
                    arrayThumbnail[thumbnailIndex].isDescription = false;
                    arrayThumbnail[thumbnailIndex].haveImage = false;
                    $divLeft += '<div id="thumbnail' + thumbnailIndex + '"';
                        $divLeft += ' class="thumbnail"';
                        $divLeft += '>';
                        $divLeft += '<img id="thumbnailImageLeft' + thumbnailIndex + '"';
                            $divLeft += ' class="thumbnailLeftImage"';
                            $divLeft += ' style="border: 1px solid black;"';
                            $divLeft += ' src="../images/common/emptyImage.png"';
                            $divLeft += ' alt=""';
                            $divLeft += ' haveBullet="1"';
                            $divLeft += " onclick=\"onClickThumbnailImage(" + thumbnailIndex + ")\"";
                            $divLeft += '/>';
                        $divLeft += '<div id="thumbnailLeftBullet' + thumbnailIndex + '"';
                            $divLeft += ' class="thumbnailLeftBullet"';
                            $divLeft += '>';
                            $divLeft += '<img ';
                                $divLeft += ' src="../images/common/bulletThumbnail' + section + '.png"';
                                $divLeft += '  alt=""';
                                $divLeft += '/>';
                            $divLeft += '</div>';
                        $divLeft += '</div>';
                    carrouselLeftChildWidth += thumbnailWidth;
                    $divRight += '<div id="thumbnail' + thumbnailIndex + '"';
                        $divRight += ' class="thumbnail"';
                        $divRight += '>';
                        $divRight += '<img id="thumbnailImageRight' + thumbnailIndex + '"';
                            $divRight += ' class="thumbnailRightImage"';
                            $divRight += ' style="border: 1px solid black;"';
                            $divRight += ' src="../images/common/emptyImage.png"';
                            $divRight += ' alt=""';
                            $divRight += ' subSubSectionIndex="' + bulletProgressIndex + '"';
                            $divRight += ' haveBullet="1"';
                            $divRight += " onclick=\"onClickThumbnailImage(" + thumbnailIndex + ")\"";
                            $divRight += '/>';
                        $divRight += '<div id="thumbnailRightBullet' + thumbnailIndex + '"';
                            $divRight += ' class="thumbnailRightBullet"';
                            $divRight += '>';
                            $divRight += '<img ';
                                $divRight += ' src="../images/common/bulletThumbnail' + section + '.png"';
                                $divRight += ' alt=""';
                                $divRight += '/>';
                            $divRight += '</div>';
                        $divRight += '</div>';
                    carrouselRightChildWidth += thumbnailWidth;
                    itemWithNoImageIndex++;
                    arrayItemWithNoImage[itemWithNoImageIndex] = {};
                    arrayItemWithNoImage[itemWithNoImageIndex].thumbnailIndex = thumbnailIndex;
                }
            }
        }
    }
    bulletProgressIndexMax = bulletProgressIndex;
    thumbnailIndexMax = thumbnailIndex;
    $('#bulletProgress').append($divProgress);
    $('#carrouselLeftChild').append($divLeft);
    $('#carrouselLeftChild').css('width', carrouselLeftChildWidth);
    $('#carrouselRightChild').append($divRight);
    $('#carrouselRightChild').css('width', carrouselRightChildWidth);
    if (carrouselRightChildWidth > 0) {
        bulletProgressIndex = 1;
        thumbnailIndex = 1;
        var isAlignImage = true;
        setCarrouselCurrentImage(isAlignImage);
    }
    for (var m = 1; m < arrayItemWithNoImage.length; m++) {
        refreshDescriptionThumbnail(arrayItemWithNoImage[m].thumbnailIndex, arrayThumbnail[arrayItemWithNoImage[m].thumbnailIndex].content, arrayThumbnail[arrayItemWithNoImage[m].thumbnailIndex].numbering);
    }
}
function scrollCarrousel() {
    if (carrouselPrevX > 0) {
        var shiftX = carrouselX - carrouselPrevX;
        var x = carrouselRightChild.offsetLeft;
        x = x + shiftX;
        var minX = (-1) * ($('#carrouselRightChild').width());
        if (x < minX) {
            x = minX ;
        }
        var maxX = (-1) * thumbnailWidth;
        if (x > maxX) {
            x = maxX ;
        }
        carrouselRightChild.style.position = "absolute";
        carrouselRightChild.style.left = x+'px';
        var carrouselLeftChildLeft = (thumbnailWidth * carrouselLeftVisibleThumbnailCount) + x - 65;
        carrouselLeftChild.style.position = "absolute";
        carrouselLeftChild.style.left = carrouselLeftChildLeft + 'px';
        var scrollDistanceX = Math.abs(x - (thumbnailWidth / 2));
        var lastImageNum = Math.floor(scrollDistanceX / thumbnailWidth);
        thumbnailIndex = lastImageNum;
        var imageIndex = $('#thumbnailCurrentImage').attr('imageIndex');
        if (imageIndex !== thumbnailIndex) {
            var isAlignImage = false;
            setCarrouselCurrentImage(isAlignImage);
        }
    }
    carrouselPrevX = carrouselX;
}
function refreshCarrousel(section, subsection, language) {
    var bulletProgressIndex = 0;
    var bulletProgressIndexMax = 0;
    var thumbnailIndex = 0;
    var thumbnailIndexMax = 0;
    bulletProgressIndex = 0;
    thumbnailIndex = 0;
    for (var i = 0; i < dataItems.length; i++) {
        if (dataItems[i].section === section && dataItems[i].subsection === subsection) {
            if (dataItems[i].item === 'description') {
                if (dataItems[i].thumbnail.items.length > 0) {
                    for (var k = 0; k < dataItems[i].thumbnail.items.length; k++) {
                        thumbnailIndex++;
                        arrayThumbnail[thumbnailIndex].numbering = dataItems[i].numbering[language];
                        arrayThumbnail[thumbnailIndex].content = dataItems[i].content[language];
                    }
                }
                else {
                    thumbnailIndex++;
                    arrayThumbnail[thumbnailIndex].numbering = dataItems[i].numbering[language];
                    arrayThumbnail[thumbnailIndex].content = dataItems[i].content[language];
                    refreshDescriptionThumbnail(thumbnailIndex, arrayThumbnail[thumbnailIndex].content, arrayThumbnail[thumbnailIndex].numbering);
                }
            }
            else {
                if (dataItems[i].thumbnail.items.length > 0) {
                    bulletProgressIndex++;
                    arrayBulletProgress[bulletProgressIndex].content = dataItems[i].content[language];
                    for (var k = 0; k < dataItems[i].thumbnail.items.length; k++) {
                        thumbnailIndex++;
                        arrayThumbnail[thumbnailIndex].content = dataItems[i].content[language];
                    }
                }
                else {
                    bulletProgressIndex++;
                    arrayBulletProgress[bulletProgressIndex].content = dataItems[i].content[language];
                    thumbnailIndex++;
                    arrayThumbnail[thumbnailIndex].numbering = dataItems[i].numbering[language];
                    arrayThumbnail[thumbnailIndex].content = dataItems[i].content[language];
                    refreshDescriptionThumbnail(thumbnailIndex, arrayThumbnail[thumbnailIndex].content, arrayThumbnail[thumbnailIndex].numbering);
                }
            }
        }
    }
    var isAlignImage = true;
    setCarrouselCurrentImage(isAlignImage);
}
function refreshDescriptionThumbnail(thumbnailIndex, descriptionText, descriptionNumbering) {
    descriptionY = 0;
    var canvas = document.getElementById("thumbnailCurrentCanvas");
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 6px Arial";
    ctx.fillStyle = "black";
    if (descriptionText.indexOf(";br;") === -1) {
        descriptionY += 20;
        writeTextLine(ctx, descriptionText, 30, canvas.width - (30 * 4), 10)
        document.getElementById("thumbnailImageLeft" + thumbnailIndex).src = canvas.toDataURL();
        document.getElementById("thumbnailImageRight" + thumbnailIndex).src = canvas.toDataURL();
        return;
    }
    var arrayLine = descriptionText.split(";br;");
    for (var i = 0; i < arrayLine.length; i++) {
        var textLine = arrayLine[i].trim();
        if (textLine.length > 2) {
            if (textLine.substring(0, 1) === "-") {
                textLine = textLine.substring(1, textLine.length);
                textLine = textLine.trim();
                descriptionY += 20;
                drawBulletLine(ctx, 40, 2);
                writeTextLine(ctx, textLine, 50, canvas.width - (50 * 2), 10)
            }
            else {
                descriptionY += 20;
                writeTextLine(ctx, textLine, 30, canvas.width - (30 * 4), 10)
            }
        }
        else {
            descriptionY += 20;
            writeTextLine(ctx, textLine, 30, canvas.width - (30 * 4), 10)
        }
    }
    document.getElementById("thumbnailImageLeft" + thumbnailIndex).src = canvas.toDataURL();
    document.getElementById("thumbnailImageRight" + thumbnailIndex).src = canvas.toDataURL();
}
function formateDescription(descriptionText, descriptionNumbering) {
    descriptionY = 0;
    var canvas = document.getElementById("thumbnailCurrentCanvas");
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 6px Arial";
    ctx.fillStyle = "black";
    var descHtml = "";
    descHtml += '<div id="descriptionNumber"></div>';
    if (descriptionText.indexOf(";br;") === -1) {
        descHtml += '<div class="descriptionTextLine descriptionTextLine' + language + '">' + descriptionText + '</div>';
        $('#descriptionContainer').html(descHtml);
        descriptionY += 20;
        writeTextLine(ctx, descriptionText, 30, canvas.width - (30 * 4), 10)
        document.getElementById("thumbnailCurrentImage").src = canvas.toDataURL();
        document.getElementById("thumbnailImageLeft" + thumbnailIndex).src = canvas.toDataURL();
        document.getElementById("thumbnailImageRight" + thumbnailIndex).src = canvas.toDataURL();
        return;
    }
    var arrayLine = descriptionText.split(";br;");
    for (var i = 0; i < arrayLine.length; i++) {
        var textLine = arrayLine[i].trim();
        if (textLine.length > 2) {
            if (textLine.substring(0, 1) === "-") {
                textLine = textLine.substring(1, textLine.length);
                textLine = textLine.trim();
                descHtml += '<div class="descriptionBulletLine">';
                    descHtml += '<img class="descriptionBulletImage" src="../images/common/bulletDescription' + section + '.png"></img>';
                    descHtml += '<div class="descriptionBulletText descriptionBulletText' + language + '">' + textLine + '</div>';
                    descHtml += '</div>';
                descriptionY += 20;
                drawBulletLine(ctx, 40, 2);
                writeTextLine(ctx, textLine, 50, canvas.width - (50 * 2), 10)
            }
            else {
                descHtml += '<div class="descriptionTextLine descriptionTextLine' + language + '">' + textLine + '</div>';
                descriptionY += 20;
                writeTextLine(ctx, textLine, 30, canvas.width - (30 * 4), 10)
            }
        }
        else {
            descHtml += '<div class="descriptionBulletText descriptionBulletText' + language + '">' + textLine + '</div>';
            descriptionY += 20;
            writeTextLine(ctx, textLine, 30, canvas.width - (30 * 4), 10)
        }
    }
    $('#descriptionContainer').html(descHtml);
    document.getElementById("thumbnailCurrentImage").src = canvas.toDataURL();
    document.getElementById("thumbnailImageLeft" + thumbnailIndex).src = canvas.toDataURL();
    document.getElementById("thumbnailImageRight" + thumbnailIndex).src = canvas.toDataURL();
}
function drawBulletLine(ctx, posX, r) {
    ctx.fillStyle = "black";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(posX, descriptionY, r, 0, 2 * Math.PI);
    ctx.stroke();
}
function writeTextLine(ctx, text, posX, maxWidth, lineHeight) {
    var textLine = "";
    ctx.fillStyle = "black";
    for (var i = 0; i < text.length; i++) {
        var width = ctx.measureText(textLine + text.substring(i, (i + 1))).width;
        if (width < maxWidth) {
            textLine += text.substring(i, (i + 1));
        }
        else {
            ctx.fillText(textLine, posX, descriptionY);
            textLine = "";
            textLine += text.substring(i, (i + 1));
            descriptionY += lineHeight;
        }
    }
    if (textLine.length > 0) {
        ctx.fillText(textLine, posX, descriptionY);
    }
}
function setCarrouselCurrentImage(isAlignImage) {
    var carrouselRightChildLeft = (-1) * (thumbnailWidth * thumbnailIndex);
    if (isAlignImage) {
        $('#carrouselRightChild').css('left', carrouselRightChildLeft);
    }
    var imageSrc = $('#thumbnailImageRight' + thumbnailIndex).attr('src');
    $('#thumbnailCurrentImage').attr('src', imageSrc);
    $('#thumbnailCurrentImage').attr('imageIndex', thumbnailIndex);
    var carrouselLeftChildLeft = (thumbnailWidth * (carrouselLeftVisibleThumbnailCount - 1)) - (thumbnailWidth * thumbnailIndex) + (thumbnailWidth / 2) - 17;
    if (isAlignImage) {
        $('#carrouselLeftChild').css('left', carrouselLeftChildLeft);
    }
    var haveBullet = $('#thumbnailImageRight' + thumbnailIndex).attr('haveBullet');
    if (haveBullet === '1') {
        $('#thumbnailCurrentBullet').removeClass('hideEle');
    }
    else {
        $('#thumbnailCurrentBullet').addClass('hideEle');
    }
    bulletProgressIndex = $('#thumbnailImageRight' + thumbnailIndex).attr('subSubSectionIndex');
    $('#descriptionContainer').html("");
    if (arrayThumbnail[thumbnailIndex].isDescription) {
        $('#bulletProgress').addClass('hideEle');
        $('#imageViewText').addClass('hideEle');
        $('#zoomImageButton').addClass('hideEle');
        $('#viewCurrentImage').addClass('hideEle');
        formateDescription(arrayThumbnail[thumbnailIndex].content, arrayThumbnail[thumbnailIndex].numbering);
        $('#descriptionNumber').html(arrayThumbnail[thumbnailIndex].numbering);
        $('#descriptionNumber').addClass('mainColor_' + section);
        $('#descriptionContainer').removeClass('hideEle');
        if (thumbnailIndex <= 1) {
            $('#prevViewButton').addClass('hideEle');
        }
        else {
            $('#prevViewButton').removeClass('hideEle');
        }
        if (thumbnailIndex >= thumbnailIndexMax) {
            $('#nextViewButton').removeClass('hideEle');
            if (subSectionIndex >= subSectionIndexMax) {
                if (subSubSectionIndex >= arraySubSection[subSectionIndex].subSubSectionCount) {
                    $('#nextViewButton').addClass('hideEle');
                }
            }
        }
        else {
            $('#nextViewButton').removeClass('hideEle');
        }
    }
    if (!arrayThumbnail[thumbnailIndex].isDescription) {
        $('#descriptionContainer').addClass('hideEle');
        $('#bulletProgress').removeClass('hideEle');
        $('#imageViewText').removeClass('hideEle');
        if (arrayThumbnail[thumbnailIndex].haveImage) {
            $('#zoomImageButton').removeClass('hideEle');
            $('#viewCurrentImage').removeClass('hideEle');
        }
        else {
            $('#zoomImageButton').addClass('hideEle');
            $('#viewCurrentImage').addClass('hideEle');
        }
        for (var i = 1; i <= bulletProgressIndexMax; i++) {
            if (i <= bulletProgressIndex) {
                $('#bulletProgressImage' + i).attr('src', '../images/common/bulletProgressViewed' + section + '.png');
            }
            else {
                $('#bulletProgressImage' + i).attr('src', '../images/common/bulletProgresstoview' + section + '.png');
            }
        }
        $('#imageViewText').html(arrayBulletProgress[bulletProgressIndex].content);
        $('#viewCurrentImage').attr('src', imageSrc);
        if (thumbnailIndex <= 1) {
            $('#prevViewButton').addClass('hideEle');
        }
        else {
            $('#prevViewButton').removeClass('hideEle');
        }
        if (thumbnailIndex >= thumbnailIndexMax) {
            $('#nextViewButton').removeClass('hideEle');
            if (subSectionIndex >= subSectionIndexMax) {
                if (subSubSectionIndex >= arraySubSection[subSectionIndex].subSubSectionCount) {
                    $('#nextViewButton').addClass('hideEle');
                }
            }
        }
        else {
            $('#nextViewButton').removeClass('hideEle');
        }
        if (thumbnailIndex <= arrayBulletProgress[bulletProgressIndex].minThumbnailIndex) {
            $('#prevZoomImageButton').addClass('hideEle');
        }
        else {
            $('#prevZoomImageButton').removeClass('hideEle');
        }
        if (thumbnailIndex >= arrayBulletProgress[bulletProgressIndex].maxThumbnailIndex) {
            $('#nextZoomImageButton').addClass('hideEle');
        }
        else {
            $('#nextZoomImageButton').removeClass('hideEle');
        }
        $('#zoomCurrentImage').attr('src', imageSrc);
        if (!arrayThumbnail[thumbnailIndex].haveImage) {
            $('#descriptionContainer').addClass('hideEle');
        }
        else {
            $('#descriptionContainer').removeClass('hideEle');
        }
    }
}
function setEventLanguageButton() {
    $('.languageButton').on(startEventType, function(e) {
        e.preventDefault();
        startCheckAutoRestart();
        $('.languageButton').css('opacity', 0.6);
        $(this).css('opacity', 1);
        language = $(this).attr('id');
        localStorage.setItem("language", language);
        changeLanguage(language);
    });
}
function setEventHomeSectionTitle() {
    $('#homeSectionTitle').on(startEventType, function(e) {
        e.preventDefault();
        showViewScreen();
    });
}
function setEventHomeHandImage() {
    $('#homeHandImage').on(startEventType, function(e) {
        e.preventDefault();
        showViewScreen();
    });
}
function setEventHomeButton() {
    $('#homeButton').on(startEventType, function(e) {
        e.preventDefault();
        stopCheckAutoRestart();
        hideViewScreen();
    });
}
function setEventHomeText() {
    $('#homeTitle').on(startEventType, function(e) {
        e.preventDefault();
        stopCheckAutoRestart();
        hideViewScreen();
    });
}
function setEventSubMenuItem() {
    $('.subMenuItem').on(startEventType, function(e) {
        e.preventDefault();
        startCheckAutoRestart();
        $('.subMenuItem').removeClass('mainBackgroundColor07_' + section);
        $(this).addClass('mainBackgroundColor07_' + section);
        if ($(this).attr('subSectionIndex') !== subSectionIndex) {
            $('#subSubMenu' + subSectionIndex).css('display', 'none');
            $('#subMenuItemShowChild' + subSectionIndex).removeClass('subMenuItemHideChild');
            subSubMenu = "";
        }
        if ($(this).attr('subSectionIndex') !== subSectionIndex) {
            subsection = $(this).attr('subsection');
            subSectionIndex = $(this).attr('subSectionIndex');
            subSubSectionIndex = 0;
        }
        subMenuItem = $(this).attr('id');
        var nbchild = $(this).attr('nbchild');
        if (nbchild > 0) {
            if (subSubSectionIndex === 0) {
                subSubSectionIndex = 1;
            }
            var displayChild = $('#subSubMenu' + subSectionIndex).css('display');
            if (displayChild === 'none') {
                $('#subSubMenu' + subSectionIndex).css('display', 'block');
                $('#subMenuItemShowChild' + subSectionIndex).addClass('subMenuItemHideChild');
                subSubMenu = 'subSubMenu' + subSectionIndex;
                $('.subSubMenuItem').removeClass('subSubMenuItemActive_' + section);
                $('#' + arraySubSection[subSectionIndex].arraySubSubSection[subSubSectionIndex].divIdSubSubMenuItem).addClass('subSubMenuItemActive_' + section);
                loadCarrousel(section, subsection);
            }
            else {
                $('#subSubMenu' + subSectionIndex).css('display', 'none');
                $('#subMenuItemShowChild' + subSectionIndex).removeClass('subMenuItemHideChild');
                subSubMenu = "";
            }
        }
        else {
            $('#subMenuItemShowChild' + subSectionIndex).addClass('subMenuItemHideChild');
            subSubSectionIndex = 0;
            subSubMenuItem = "";
            loadCarrousel(section, subsection);
        }
    });
}
function setEventSubSubMenuItem() {
    $('.subSubMenuItem').on(startEventType, function(e) {
        e.stopPropagation();
        startCheckAutoRestart();
        $('#subSubMenu' + subSectionIndex).css('display', 'block');
        $('#subMenuItemShowChild' + subSectionIndex).addClass('subMenuItemHideChild');
        subSubMenu = 'subSubMenu' + subSectionIndex;
        $('.subSubMenuItem').removeClass('subSubMenuItemActive_' + section);
        $(this).addClass('subSubMenuItemActive_' + section);
        subsection = $(this).attr('subsection');
        loadCarrousel(section, subsection);
        subSubMenuItem = $(this).attr('id');
        subSubSectionIndex = $(this).attr('subSubSectionIndex');
    });
}
function setEventPrevViewButton() {
    $('#prevViewButton').on(startEventType, function(e) {
        e.preventDefault();
        startCheckAutoRestart();
        if (thumbnailIndex > 1) {
            thumbnailIndex--;
            var isAlignImage = true;
            setCarrouselCurrentImage(isAlignImage);
        }
    });
}
function setEventNextViewButton() {
    $('#nextViewButton').on(startEventType, function(e) {
        e.preventDefault();
        startCheckAutoRestart();
        if (thumbnailIndex < thumbnailIndexMax) {
            thumbnailIndex++;
            var isAlignImage = true;
            setCarrouselCurrentImage(isAlignImage);
        }
        else {
            selectNextMenuItem(subSectionIndex);
        }
    });
}
function setEventZoomImageButton() {
    $('#zoomImageButton').on(startEventType, function(e) {
        e.preventDefault();
        startCheckAutoRestart();
        $('#zoomImageFrame').removeClass('hideEle');
        $('#zoomCurrentImage').removeClass('hideEle');
    });
}
function setEventCloseZoomImageButton() {
    $('#closeZoomImageButton').on(startEventType, function(e) {
        e.preventDefault();
        startCheckAutoRestart();
        $('#zoomImageFrame').addClass('hideEle');
        $('#zoomCurrentImage').addClass('hideEle');
    });
}
function setEventPrevZoomImageButton() {
    $('#prevZoomImageButton').on(startEventType, function(e) {
        e.preventDefault();
        startCheckAutoRestart();
        if (thumbnailIndex > 1) {
            thumbnailIndex--;
            var isAlignImage = true;
            setCarrouselCurrentImage(isAlignImage);
        }
    });
}
function setEventNextZoomImageButton() {
    $('#nextZoomImageButton').on(startEventType, function(e) {
        e.preventDefault();
        startCheckAutoRestart();
        if (thumbnailIndex < thumbnailIndexMax) {
            thumbnailIndex++;
            var isAlignImage = true;
            setCarrouselCurrentImage(isAlignImage);
        }
    });
}
function setDragEventCarrouselRightChild() {
    carrouselRightChild = document.getElementById("carrouselRightChild");
    carrouselLeftChild = document.getElementById("carrouselLeftChild");
    var moveDraggingRightTS = function (e) {
        stopCheckCarrouselMousedown();
        e.preventDefault();
        if (!isCarrouselMousedown) {
            return;
        }
        carrouselX = parseInt(e.touches[0].clientX);
        scrollCarrousel();
        saveCarrouselMouseMove();
    };
    var moveDraggingRight = function (e) {
        stopCheckCarrouselMousedown();
        e.preventDefault();
        if (!isCarrouselMousedown) {
            return;
        }
        carrouselX = e.pageX;
        scrollCarrousel();
        saveCarrouselMouseMove();
    };
    var startDraggingRightTS = function (e) {
        stopAutoScrollCarrousel();
        startCheckAutoRestart();
        isCarrouselMousedown = true;
        carrouselX = parseInt(e.touches[0].clientX);
        carrouselPrevX = carrouselX;
        startCarrouselMouseMove();
    };
    var startDraggingRight = function (e) {
        stopAutoScrollCarrousel();
        startCheckAutoRestart();
        isCarrouselMousedown = true;
        carrouselX = e.pageX;
        carrouselPrevX = carrouselX;
        carrouselMousedownX = e.pageX;
        carrouselMouseupX = 0;
        startCarrouselMouseMove();
    };
    var stopDraggingRightTS = function (e) {
        startCheckAutoRestart();
        isCarrouselMousedown = false;
        carrouselPrevX = 0;
        var isAlignImage = true;
        setCarrouselCurrentImage(isAlignImage);
        ////////// carrouselMouseupX = parseInt(e.touches[0].clientX); //////////
        ////////// carrouselX = parseInt(e.touches[0].clientX); //////////
        ////////// carrouselPrevX = carrouselX; //////////
        stopCarrouselMouseMove();
    };
    var stopDraggingRight = function (e) {
        startCheckAutoRestart();
        isCarrouselMousedown = false;
        carrouselPrevX = 0;
        var isAlignImage = true;
        setCarrouselCurrentImage(isAlignImage);
        carrouselMouseupX = e.pageX;
        carrouselX = e.pageX;
        carrouselPrevX = carrouselX;
        stopCarrouselMouseMove();
    };
    var leaveDraggingRight = function (e) {
        startCheckAutoRestart();
        carrouselPrevX = 0;
        startCheckCarrouselMousedown();
    };
    carrouselRightChild.addEventListener('mousemove', moveDraggingRight, false);
    carrouselRightChild.addEventListener('mousedown', startDraggingRight, false);
    carrouselRightChild.addEventListener('mouseup', stopDraggingRight, false);
    carrouselRightChild.addEventListener('mouseleave', leaveDraggingRight, false);
    carrouselRightChild.addEventListener('touchmove', moveDraggingRightTS, false);
    carrouselRightChild.addEventListener('touchstart', startDraggingRightTS, false);
    carrouselRightChild.addEventListener('touchend', stopDraggingRightTS, false);
    carrouselRightChild.addEventListener('touchcancel', leaveDraggingRight, false);
}
function setDragEventCarrouselLeftChild() {
    carrouselRightChild = document.getElementById("carrouselRightChild");
    carrouselLeftChild = document.getElementById("carrouselLeftChild");
    var moveDraggingLeftTS = function (e) {
        stopCheckCarrouselMousedown();
        e.preventDefault();
        if (!isCarrouselMousedown) {
            return;
        }
        carrouselX = parseInt(e.touches[0].clientX);
        scrollCarrousel();
        saveCarrouselMouseMove();
    };
    var moveDraggingLeft = function (e) {
        stopCheckCarrouselMousedown();
        e.preventDefault();
        if (!isCarrouselMousedown) {
            return;
        }
        carrouselX = e.pageX;
        scrollCarrousel();
        saveCarrouselMouseMove();
    };
    var startDraggingLeftTS = function (e) {
        stopAutoScrollCarrousel();
        startCheckAutoRestart();
        isCarrouselMousedown = true;
        carrouselX = parseInt(e.touches[0].clientX);
        carrouselPrevX = carrouselX;
        startCarrouselMouseMove();
    };
    var startDraggingLeft = function (e) {
        stopAutoScrollCarrousel();
        startCheckAutoRestart();
        isCarrouselMousedown = true;
        carrouselX = e.pageX;
        carrouselPrevX = carrouselX;
        carrouselMousedownX = e.pageX;
        carrouselMouseupX = 0;
        startCarrouselMouseMove();
    };
    var stopDraggingLeftTS = function (e) {
        startCheckAutoRestart();
        isCarrouselMousedown = false;
        carrouselPrevX = 0;
        var isAlignImage = true;
        setCarrouselCurrentImage(isAlignImage);
        ////////// carrouselMouseupX = parseInt(e.touches[0].clientX); //////////
        ////////// carrouselX = parseInt(e.touches[0].clientX); //////////
        ////////// carrouselPrevX = carrouselX; //////////
        stopCarrouselMouseMove();
    };
    var stopDraggingLeft = function (e) {
        startCheckAutoRestart();
        isCarrouselMousedown = false;
        carrouselPrevX = 0;
        var isAlignImage = true;
        setCarrouselCurrentImage(isAlignImage);
        carrouselMouseupX = e.pageX;
        carrouselX = e.pageX;
        carrouselPrevX = carrouselX;
        stopCarrouselMouseMove();
    };
    var leaveDraggingLeft = function (e) {
        startCheckAutoRestart();
        carrouselPrevX = 0;
        startCheckCarrouselMousedown();
    };
    carrouselLeftChild.addEventListener('mousemove', moveDraggingLeft, false);
    carrouselLeftChild.addEventListener('mousedown', startDraggingLeft, false);
    carrouselLeftChild.addEventListener('mouseup', stopDraggingLeft, false);
    carrouselLeftChild.addEventListener('mouseleave', leaveDraggingLeft, false);
    carrouselLeftChild.addEventListener('touchmove', moveDraggingLeftTS, false);
    carrouselLeftChild.addEventListener('touchstart', startDraggingLeftTS, false);
    carrouselLeftChild.addEventListener('touchend', stopDraggingLeftTS, false);
    carrouselLeftChild.addEventListener('touchcancel', leaveDraggingLeft, false);
}
function setDragEventCarrouselCurrentImage() {
    thumbnailCurrentImage = document.getElementById("thumbnailCurrentImage");
    carrouselRightChild = document.getElementById("carrouselRightChild");
    carrouselLeftChild = document.getElementById("carrouselLeftChild");
    var moveDraggingLeftTS = function (e) {
        stopCheckCarrouselMousedown();
        e.preventDefault();
        if (!isCarrouselMousedown) {
            return;
        }
        carrouselX = parseInt(e.touches[0].clientX);
        scrollCarrousel();
        saveCarrouselMouseMove();
    };
    var moveDraggingLeft = function (e) {
        stopCheckCarrouselMousedown();
        e.preventDefault();
        if (!isCarrouselMousedown) {
            return;
        }
        carrouselX = e.pageX;
        scrollCarrousel();
        saveCarrouselMouseMove();
    };
    var startDraggingLeftTS = function (e) {
        stopAutoScrollCarrousel();
        startCheckAutoRestart();
        isCarrouselMousedown = true;
        carrouselX = parseInt(e.touches[0].clientX);
        carrouselPrevX = carrouselX;
        startCarrouselMouseMove();
    };
    var startDraggingLeft = function (e) {
        stopAutoScrollCarrousel();
        startCheckAutoRestart();
        isCarrouselMousedown = true;
        carrouselX = e.pageX;
        carrouselPrevX = carrouselX;
        startCarrouselMouseMove();
    };
    var stopDraggingLeftTS = function (e) {
        startCheckAutoRestart();
        isCarrouselMousedown = false;
        carrouselPrevX = 0;
        var isAlignImage = true;
        setCarrouselCurrentImage(isAlignImage);
        ////////// carrouselMouseupX = parseInt(e.touches[0].clientX); //////////
        ////////// carrouselX = parseInt(e.touches[0].clientX); //////////
        ////////// carrouselPrevX = carrouselX; //////////
        stopCarrouselMouseMove();
    };
    var stopDraggingLeft = function (e) {
        startCheckAutoRestart();
        isCarrouselMousedown = false;
        carrouselPrevX = 0;
        var isAlignImage = true;
        setCarrouselCurrentImage(isAlignImage);
        carrouselMouseupX = e.pageX;
        carrouselX = e.pageX;
        carrouselPrevX = carrouselX;
        stopCarrouselMouseMove();
    };
    var leaveDraggingLeft = function (e) {
        startCheckAutoRestart();
        carrouselPrevX = 0;
        startCheckCarrouselMousedown();
    };
    thumbnailCurrentImage.addEventListener('mousemove', moveDraggingLeft, false);
    thumbnailCurrentImage.addEventListener('mousedown', startDraggingLeft, false);
    thumbnailCurrentImage.addEventListener('mouseup', stopDraggingLeft, false);
    thumbnailCurrentImage.addEventListener('mouseleave', leaveDraggingLeft, false);
    thumbnailCurrentImage.addEventListener('touchmove', moveDraggingLeftTS, false);
    thumbnailCurrentImage.addEventListener('touchstart', startDraggingLeftTS, false);
    thumbnailCurrentImage.addEventListener('touchend', stopDraggingLeftTS, false);
    thumbnailCurrentImage.addEventListener('touchcancel', leaveDraggingLeft, false);
}
function onClickThumbnailImage(clickedThumbnailIndex) {
    startCheckAutoRestart();
    if ((carrouselMousedownX != 0) && (carrouselMouseupX != 0)) {
        var shift = Math.abs(carrouselMouseupX - carrouselMousedownX);
        carrouselMousedownX = 0;
        carrouselMouseupX = 0;
        if (shift > 10) {
            return;
        }
    }
    carrouselMousedownX = 0;
    carrouselMouseupX = 0;
    thumbnailIndex = clickedThumbnailIndex;
    var isAlignImage = true;
    setCarrouselCurrentImage(isAlignImage);
}
function startCheckCarrouselMousedown() {
    stopCheckCarrouselMousedown();
    checkCarrouselMousedownTimerObj = setInterval(checkCarrouselMousedown, 0.2 * 1000);
}
function stopCheckCarrouselMousedown() {
    if (checkCarrouselMousedownTimerObj != null) {
        clearInterval(checkCarrouselMousedownTimerObj);
        checkCarrouselMousedownTimerObj = null;
    }
}
function checkCarrouselMousedown() {
    stopCheckCarrouselMousedown();
    if (isCarrouselMousedown) {
        isCarrouselMousedown = false;
        var isAlignImage = true;
        setCarrouselCurrentImage(isAlignImage);
    }
}
function startCarrouselMouseMove() {
    arrayCarrouselMouseMove = new Array();
    arrayCarrouselMouseMove[0] = {};
    arrayCarrouselMouseMove[0].posX = carrouselX;
    arrayCarrouselMouseMove[0].eventTime = new Date();
    arrayCarrouselMouseMove[0].isMoveToLeft = false;
}
function saveCarrouselMouseMove() {
    var arrayLength = arrayCarrouselMouseMove.length;
    var newIndex = arrayLength;
    if (newIndex == 1) {
        arrayCarrouselMouseMove[newIndex] = {};
        arrayCarrouselMouseMove[newIndex].posX = carrouselX;
        arrayCarrouselMouseMove[newIndex].eventTime = new Date();
        if (carrouselX < arrayCarrouselMouseMove[newIndex - 1].posX) {
            arrayCarrouselMouseMove[newIndex].isMoveToLeft = true;
        }
        else {
            arrayCarrouselMouseMove[newIndex].isMoveToLeft = false;
        }
    }
    else {
        if (arrayCarrouselMouseMove[newIndex - 1].isMoveToLeft) {
            if (carrouselX < arrayCarrouselMouseMove[newIndex - 1].posX) {
                arrayCarrouselMouseMove[newIndex] = {};
                arrayCarrouselMouseMove[newIndex].posX = carrouselX;
                arrayCarrouselMouseMove[newIndex].eventTime = new Date();
                arrayCarrouselMouseMove[newIndex].isMoveToLeft = true;
            }
            else {
                arrayCarrouselMouseMove = new Array();
                arrayCarrouselMouseMove[0] = {};
                arrayCarrouselMouseMove[0].posX = carrouselX;
                arrayCarrouselMouseMove[0].eventTime = new Date();
                arrayCarrouselMouseMove[0].isMoveToLeft = false;
            }
        }
        else {
            if (carrouselX > arrayCarrouselMouseMove[newIndex - 1].posX) {
                arrayCarrouselMouseMove[newIndex] = {};
                arrayCarrouselMouseMove[newIndex].posX = carrouselX;
                arrayCarrouselMouseMove[newIndex].eventTime = new Date();
                arrayCarrouselMouseMove[newIndex].isMoveToLeft = false;
            }
            else {
                arrayCarrouselMouseMove = new Array();
                arrayCarrouselMouseMove[0] = {};
                arrayCarrouselMouseMove[0].posX = carrouselX;
                arrayCarrouselMouseMove[0].eventTime = new Date();
                arrayCarrouselMouseMove[0].isMoveToLeft = false;
            }
        }
    }
}
function stopCarrouselMouseMove() {
    var eventTime = new Date();
    var elapseMillisecond = 0;
    var posX = 0;
    var distance = 0;
    var validDistance = 0;
    var arrayLength = arrayCarrouselMouseMove.length;
    var lastIndex = arrayLength - 1;
    elapseMillisecond = eventTime - arrayCarrouselMouseMove[lastIndex].eventTime;
    if (lastIndex <= 3) {
        arrayCarrouselMouseMove = new Array();
        return;
    }
    if (elapseMillisecond > 20) {
        arrayCarrouselMouseMove = new Array();
        return;
    }
    eventTime = arrayCarrouselMouseMove[lastIndex].eventTime;
    posX = arrayCarrouselMouseMove[lastIndex].posX;
    validDistance = 0;
    for (var i = (lastIndex - 1); i >= 1; i--) {
        elapseMillisecond = eventTime - arrayCarrouselMouseMove[i].eventTime;
        distance = Math.abs(posX - arrayCarrouselMouseMove[i].posX);
        if (elapseMillisecond > 200) {
            break;
        }
        validDistance = distance;
    }
    if (validDistance < 20) {
        arrayCarrouselMouseMove = new Array();
        return;
    }
    autoScrollCarrouselCount = 0;
    var coef = Math.floor(validDistance / 100) + 1;
    autoScrollDistance = Math.floor(coef * 1.4);
    autoScrollCarrouselMax = coef * 25;
    if (arrayCarrouselMouseMove[lastIndex].isMoveToLeft) {
        arrayCarrouselMouseMove = new Array();
        autoScrollDistance = (-1) * autoScrollDistance;
        startAutoScrollCarrousel();
    }
    else {
        arrayCarrouselMouseMove = new Array();
        startAutoScrollCarrousel();
    }
}
function startAutoScrollCarrousel() {
    stopAutoScrollCarrousel();
    autoScrollCarrouselTimerObj = setInterval(autoScrollCarrousel, 5);
}
function stopAutoScrollCarrousel() {
    if (autoScrollCarrouselTimerObj != null) {
        clearInterval(autoScrollCarrouselTimerObj);
        autoScrollCarrouselTimerObj = null;
        autoScrollCarrouselCount = 0;
        autoScrollCarrouselMax = 0;
    }
}
function autoScrollCarrousel() {
    autoScrollCarrouselCount++;
    var decreaseDistance = Math.round(autoScrollDistance * ((autoScrollCarrouselMax - autoScrollCarrouselCount) / autoScrollCarrouselMax));
    carrouselX = carrouselX + decreaseDistance;
    scrollCarrousel();
    if (autoScrollCarrouselCount >= autoScrollCarrouselMax) {
        stopAutoScrollCarrousel();
        var isAlignImage = true;
        setCarrouselCurrentImage(isAlignImage);
    }
}
function startCheckAutoRestart() {
    stopCheckAutoRestart();
    checkAutoRestartTimerObj = setInterval(checkAutoRestart, 2 * 60 * 1000);
}
function stopCheckAutoRestart() {
    if (checkAutoRestartTimerObj != null) {
        clearInterval(checkAutoRestartTimerObj);
        checkAutoRestartTimerObj = null;
    }
}
function checkAutoRestart() {
    stopCheckAutoRestart();
    $('#zoomImageFrame').addClass('hideEle');
    $('#zoomCurrentImage').addClass('hideEle');
    hideViewScreen();
}
jQuery(document).ready(function($) {
    if (hideSwitchLanguage === true) {
        language = 'en';
        localStorage.setItem("language", language);
        $('#en').addClass('hideEle');
        $('#fr').addClass('hideEle');
        $('#kh').addClass('hideEle');
    }
    language = localStorage.getItem("language");
    if (language === null) {
        language = 'en';
    }
    $('.languageButton').css('opacity', 0.6);
    $('#' + language).css('opacity', 1);
    if ((section != 'section1') && (section != 'section2'))  {
        section = 'section1';
    }
    $('#homeScreenFrame').addClass('mainBackgroundColor_' + section);
    $('#homeScreenFrame').attr('section', section);
    $('#homeBackgroundImage').addClass('homeBackgroundImage_' + section);
    var sectionTitle = dataSection[1 * section.replace('section', '') - 1][language];
    $('#homeSectionTitle').html(sectionTitle);
    $('#homeSectionTitle').addClass('homeSectionTitle_' + section);
    $('#homeSectionTitle').attr('section', section);
    var sectionDescription = dataSection[1 * section.replace('section', '') - 1].description[language];
    $('#homeSectionDescription').html(sectionDescription);
    $('#homeSectionDescription').addClass('homeSectionDescription_' + section);
    $('#homeHandImage').addClass('homeHandImage_' + section);
    $('#homeHandImage').attr('section', section);
    $('#homeTitle').html(dataHome[language]);
    $('#viewBackgroundImage').addClass('viewBackgroundImage_' + section);
    $('#carrouselVLine').addClass('carrouselVLine_' + section);
    loadMenu(section);
    subSectionIndex = 0;
    subSubSectionIndex = 0;
    selectNextMenuItem(subSectionIndex);
    refreshLanguageFont();
    var colorSection = $('#homeScreenFrame').css("background-color");
    var textWidth = $('#thumbnailClass').css('width');
    textWidth = textWidth.replace('px', '');
    thumbnailWidth = Number(textWidth);
    textWidth = $('#thumbnailCurrent').css('width');
    textWidth = textWidth.replace('px', '');
    thumbnailCurrentWidth = Number(textWidth);
    $('#thumbnailCurrentBullet').attr('src', '../images/common/bulletThumbnail' + section + '.png');
    $('#prevViewButton').attr('src', '../images/common/prevView' + section + '.png');
    $('#nextViewButton').attr('src', '../images/common/nextView' + section + '.png');
    $('#zoomImageButton').attr('src', '../images/common/zoomImage' + section + '.png');
    $('#zoomImageFrame').css('background-color', colorSection);
    $('#closeZoomImageButton').attr('src', '../images/common/closeZoomImage.png');
    $('#prevZoomImageButton').attr('src', '../images/common/prevZoomImage.png');
    $('#nextZoomImageButton').attr('src', '../images/common/nextZoomImage.png');
    hideViewScreen();
    setEventLanguageButton();
    setEventHomeSectionTitle();
    setEventHomeHandImage();
    setEventHomeButton();
    setEventHomeText();
    setEventSubMenuItem();
    setEventSubSubMenuItem();
    setEventPrevViewButton();
    setEventNextViewButton();
    setEventZoomImageButton();
    setEventCloseZoomImageButton();
    setEventPrevZoomImageButton();
    setEventNextZoomImageButton();
    setDragEventCarrouselRightChild();
    setDragEventCarrouselLeftChild();
    setDragEventCarrouselCurrentImage();
});
