jQuery(document).ready(function($) {

    $('body').on('click', '#collapse01 #detal', function() {
        $('#collapse01 .attention').slideToggle();
    });
    $('body').on('click', '#collapse02 #detal', function() {
        $('#collapse02 .attention').slideToggle();
    });
    $('body').on('click', '#collapse03 #detal_book', function() {
        $('#collapse03 .attention').slideToggle();
    });
    $('body').on('click', '#collapse04 #detal_book', function() {
        $('#collapse04 .attention').slideToggle();
    });
    $('body').on('click', '#collapse05 #detal_book', function() {
        $('#collapse05 .attention').slideToggle();
    });

    $('body').on('click', '#collapse03 #pc', function() {
        if ($(this).is(':checked')) {
            $(this).prop('checked', true);
            $('.block_01').css('display', 'block');
            $('.block_01:last').css('display', 'none');
        } else {
            $(this).prop('checked', false);
            $('.block_01').css('display', 'none');
        }
    });

    $('body').on('click', '#collapse03 #pb', function() {
        if ($(this).is(':checked')) {
            $(this).prop('checked', true);
            $('.block_02').css('display', 'block');
            $('.block_02:last').css('display', 'none');
        } else {
            $(this).prop('checked', false);
            $('.block_02').css('display', 'none');
        }
    });

    $('body').on('click', '#collapse03 #forz', function() {
        if ($(this).is(':checked')) {
            $(this).prop('checked', true);
            $('.block_03').css('display', 'block');
        } else {
            $(this).prop('checked', false);
            $('.block_03').css('display', 'none');
        }
    });



    $('body').on('click', '#pp', function() {
        if ($(this).is(':checked')) {
            $(this).prop('checked', true);
            $('.print-vizible').css('display', 'block');
        } else {
            $(this).prop('checked', false);
            $('.print-vizible').css('display', 'none');
            if ($('#lamination option:selected').val() != 0) {
                $("#lamination option[value=0]").prop('selected', true);
                $('#layer_out').css('display', 'none');
            }
            $('.print-vizible #sel_02').find('option[value=0]').prop('selected', true);
            $('.print-vizible #sel_06').find('option[value=0]').prop('selected', true);
            $('.print-vizible #sel_03').find('option[value=0]').prop('selected', true);
            $('.print-vizible #sel_04').find('option[value=0]').prop('selected', true);
            $('.print-vizible #sel_05').find('option[value=0]').prop('selected', true);
            if ($('#person_num').is(':checked')) {
                $('#person_num').prop('checked', false);
            }
        }
    });

    $('body').on('change', '#lamination', function() {
        if ($('#lamination option:selected').val() != 0) {
            $('#layer_out').css('display', 'block');
        } else {
            $('#layer_out').css('display', 'none');
        }
    });

    $('body').on('change', '#laminacia_cover', function() {
        if ($('#laminacia_cover option:selected').val() != 0) {
            if ($(window).width() > 1400 || $(window).width() < 769) {
                $('.lam_cover').css('display', 'flex').addClass('align-items-end');
                if ($(window).width() < 576) {
                    $('.lam_cover').css({ 'display': 'block', 'padding-top': '0' }).removeClass('align-items-end');
                }
            } else {
                $('.lam_cover').css({ 'display': 'block', 'padding-top': '0' }).removeClass('align-items-end');
            }
        } else {
            $('.lam_cover').css('display', 'none');
        }
    });

    $('body').on('change', '#laminacia_block', function() {
        if ($('#laminacia_block option:selected').val() != 0) {
            if ($(window).width() > 1400 || $(window).width() < 769) {
                $('.lam_block').css('display', 'flex').addClass('align-items-end');
                if ($(window).width() < 576) {
                    $('.lam_block').css({ 'display': 'block', 'padding-top': '0' }).removeClass('align-items-end');
                }
            } else {
                $('.lam_block').css({ 'display': 'block', 'padding-top': '0' }).removeClass('align-items-end');
            }
        } else {
            $('.lam_block').css('display', 'none');
        }
    });

    $('body').on('change', '#count-vkladka', function() {
        $('.block_04').css('display', 'block');
        if ($('#count-vkladka').val() == 0 || $('#count-vkladka').val() == '') {
            $('.block_04').css('display', 'none');
        }
    });

    $('body').on('click', '.nav-item', function() {
        $('.navbar-collapse.collapse.show').removeClass('show');
    });

});